from flask import Flask
from flask_cors import CORS

from .config import DEFAULT_CORS_ORIGINS, MODEL_CANDIDATES, STATIC_DIR
from .inference import ModelService
from .routes import api


def create_app(config=None):
    app = Flask(__name__, static_folder=None)
    app.config.from_mapping(
        CORS_ALLOWED_ORIGINS=DEFAULT_CORS_ORIGINS,
        MODEL_CANDIDATES=MODEL_CANDIDATES,
        STATIC_DIR=STATIC_DIR,
    )
    if config:
        app.config.update(config)

    origins = [
        origin.strip()
        for origin in app.config["CORS_ALLOWED_ORIGINS"].split(",")
        if origin.strip()
    ]
    CORS(app, resources={r"/api/*": {"origins": origins}})

    service = app.config.get("MODEL_SERVICE") or ModelService(
        app.config["MODEL_CANDIDATES"]
    )
    app.extensions["model_service"] = service
    app.register_blueprint(api)
    return app


__all__ = ["create_app"]