from flask import Blueprint, current_app, jsonify, request, send_from_directory
from werkzeug.exceptions import NotFound

from .schema import normalize_payload

api = Blueprint("api", __name__)


def _service():
    return current_app.extensions["model_service"]


@api.get("/health")
@api.get("/api/health")
def health():
    service = _service()
    return jsonify(
        status="ok",
        model_loaded=service.is_loaded,
        model_name=service.model_name,
    )


@api.post("/predict")
@api.post("/api/predict")
def predict():
    service = _service()
    if not service.is_loaded:
        return jsonify(error="Model not loaded. Check server logs."), 500

    try:
        normalized = normalize_payload(request.get_json(silent=True))
    except ValueError as exc:
        return jsonify(error=str(exc)), 400

    try:
        return jsonify(service.predict(normalized))
    except Exception:
        current_app.logger.exception("Prediction failed")
        return jsonify(error="Prediction failed. Please try again."), 500


@api.get("/")
def home():
    static_dir = current_app.config["STATIC_DIR"]
    if (static_dir / "index.html").exists():
        return send_from_directory(static_dir, "index.html")
    return "Mental Health Prediction API - POST to /predict"


@api.get("/<path:path>")
def frontend(path):
    static_dir = current_app.config["STATIC_DIR"]
    if not static_dir.exists():
        return jsonify(error="Frontend build not found"), 404

    try:
        return send_from_directory(static_dir, path)
    except NotFound:
        if (static_dir / "index.html").exists():
            return send_from_directory(static_dir, "index.html")
        return jsonify(error="Frontend build not found"), 404