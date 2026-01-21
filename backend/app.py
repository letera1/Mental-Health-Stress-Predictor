from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import os

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

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

try:
    # Load ensemble soft voting model
    model_path = os.path.join(BASE_DIR, 'models', 'mental_health_model_ensemble_soft.pkl')
    model = joblib.load(model_path)
    print("Ensemble model (soft voting) loaded successfully")
    
except Exception as e:
    model = None
    print(f"Error loading model: {e}")
    print("Please ensure scikit-learn version 1.6.1 is installed: pip install scikit-learn==1.6.1")

FEATURES = [
    "Age", "Gender", "GPA", "Stress_Level", "Anxiety_Score", "Depression_Score",
    "Sleep_Hours", "Steps_Per_Day", "Mood_Description", "Sentiment_Score"
]

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Mental Health Prediction API - POST to /predict"

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded. Check server logs."}), 500
    
    try:
        data = request.json
        missing = [f for f in FEATURES if f not in data]
        if missing:
            return jsonify({"error": f"Missing: {', '.join(missing)}"}), 400
        
        # Create DataFrame with column names (required for ensemble model)
        input_data = pd.DataFrame([[float(data[f]) for f in FEATURES]], columns=FEATURES)
        
        # Make prediction (model handles preprocessing internally)
        pred = int(model.predict(input_data)[0])
        return jsonify({"prediction": pred})
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)