from pathlib import Path

import joblib
import pandas as pd
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

"""
=============================================================================
MindCare AI - Backend API
=============================================================================
This module serves as the entry point for the Flask-based REST API.
It handles bridging the React frontend with the Scikit-Learn Ensemble Model.

Endpoints:
    - GET /        : Health check
    - POST /predict: Inference endpoint expecting JSON data
=============================================================================
"""

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"

FEATURES = [
    "Age", "Gender", "GPA", "Stress_Level", "Anxiety_Score", "Depression_Score",
    "Sleep_Hours", "Steps_Per_Day", "Mood_Description", "Sentiment_Score"
]

NUMERIC_FIELDS = {
    "Age",
    "GPA",
    "Stress_Level",
    "Anxiety_Score",
    "Depression_Score",
    "Sleep_Hours",
    "Steps_Per_Day",
    "Sentiment_Score",
}

GENDER_MAP = {
    "0": "Female",
    "1": "Male",
    "2": "Other",
    0: "Female",
    1: "Male",
    2: "Other",
    "female": "Female",
    "male": "Male",
    "other": "Other",
}

MOOD_MAP = {
    "0": "Happy",
    "1": "Sad",
    "2": "Anxious",
    "3": "Tired",
    "4": "Relaxed",
    "5": "Stressed",
    "6": "Motivated",
    0: "Happy",
    1: "Sad",
    2: "Anxious",
    3: "Tired",
    4: "Relaxed",
    5: "Stressed",
    6: "Motivated",
    "happy": "Happy",
    "sad": "Sad",
    "anxious": "Anxious",
    "tired": "Tired",
    "relaxed": "Relaxed",
    "stressed": "Stressed",
    "motivated": "Motivated",
}


def _load_model():
    model_candidates = [
        BASE_DIR / "models" / "mental_health_model_production.pkl",
        BASE_DIR / "models" / "mental_health_model_ensemble_soft.pkl",
        BASE_DIR / "models" / "mental_health_model_ensemble_hard.pkl",
        BASE_DIR / "models" / "mental_health_model.pkl",
    ]

    for path in model_candidates:
        if path.exists():
            try:
                loaded = joblib.load(path)
                print(f"Model loaded successfully: {path.name}")
                return loaded, path.name
            except Exception as exc:
                print(f"Failed to load {path.name}: {exc}")

    print("No loadable model artifact found in backend/models")
    return None, None


model, loaded_model_name = _load_model()

app = Flask(__name__)
CORS(app)


def _normalize_payload(data):
    if not isinstance(data, dict):
        raise ValueError("JSON body must be an object")

    missing = [field for field in FEATURES if field not in data]
    if missing:
        raise ValueError(f"Missing: {', '.join(missing)}")

    normalized = {}
    for field in FEATURES:
        value = data[field]

        if value is None or value == "":
            raise ValueError(f"Field '{field}' cannot be empty")

        if field in NUMERIC_FIELDS:
            normalized[field] = float(value)
            continue

        if field == "Gender":
            gender_key = value.lower().strip() if isinstance(value, str) else value
            if gender_key not in GENDER_MAP:
                raise ValueError("Gender must be one of: Female, Male, Other (or 0/1/2)")
            normalized[field] = GENDER_MAP[gender_key]
            continue

        if field == "Mood_Description":
            mood_key = value.lower().strip() if isinstance(value, str) else value
            if mood_key not in MOOD_MAP:
                raise ValueError(
                    "Mood_Description must be one of: "
                    "Happy, Sad, Anxious, Tired, Relaxed, Stressed, Motivated (or 0-6)"
                )
            normalized[field] = MOOD_MAP[mood_key]
            continue

    return normalized


@app.route("/health", methods=["GET"])
def health():
    return jsonify(
        {
            "status": "ok",
            "model_loaded": model is not None,
            "model_name": loaded_model_name,
        }
    )


@app.route('/')
def home():
    if (STATIC_DIR / "index.html").exists():
        return send_from_directory(STATIC_DIR, "index.html")
    return "Mental Health Prediction API - POST to /predict"

@app.route('/predict', methods=['POST'])
@app.route('/api/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded. Check server logs."}), 500

    try:
        payload = request.get_json(silent=True)
        normalized = _normalize_payload(payload)

        # Create DataFrame with strict column ordering expected by the pipeline.
        input_data = pd.DataFrame([normalized], columns=FEATURES)

        # Make prediction (model handles preprocessing internally)
        pred = int(model.predict(input_data)[0])
        label_map = {0: "Healthy", 1: "At Risk", 2: "Struggling"}
        return jsonify({"prediction": pred, "label": label_map.get(pred, "Unknown")})

    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except Exception as exc:
        return jsonify({"error": str(exc)}), 400


@app.route('/<path:path>', methods=['GET'])
def serve_frontend(path):
    if not STATIC_DIR.exists():
        return jsonify({"error": "Frontend build not found"}), 404

    requested = STATIC_DIR / path
    if requested.exists() and requested.is_file():
        return send_from_directory(STATIC_DIR, path)

    if (STATIC_DIR / "index.html").exists():
        return send_from_directory(STATIC_DIR, "index.html")

    return jsonify({"error": "Frontend build not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)