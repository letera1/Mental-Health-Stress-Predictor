# ⚡ Quick Start: MindCare Inference Engine & UI

This guide provides instructions for deploying the **MindCare AI** full-stack application locally. The system consists of a Python-based inference server (Flask) and a React client interface.

![Environment](https://img.shields.io/badge/Environment-Dev-lightgrey)
![Platform](https://img.shields.io/badge/Platform-Win%20%7C%20Mac%20%7C%20Linux-lightgrey)

---

## 🔧 Environment Prerequisites

Ensure your development environment has the following runtimes validated:

*   **Python Runtime**: v3.9+ (Recommended: 3.10)
*   **Node Runtime**: v18 LTS or higher
*   **Package Managers**: `pip` (Python), `npm` or `yarn` (JS)
*   **Virtual Environment**: `venv` or `conda` (recommended for isolation)

---

## 🖥️ Backend Deployment (Inference Server)

The backend exposes a RESTful API serving the **Soft Voting Ensemble Classifier**.

### 1. Initialize Virtual Environment
It is best practice to run ML workloads in isolated environments to avoid dependency conflicts (specifically scikit-learn versions).

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
.\venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate
```

### 2. Install ML Dependencies
**Critical**: The serialized model artifacts require a specific `scikit-learn` version for deserialization compatibility.

```bash
pip install -r requirements.txt
# OR manual install
pip install flask flask-cors scikit-learn==1.6.1 pandas numpy joblib
```

### 3. Launch API Server
The server initializes the inference pipeline upon startup.

```bash
python app.py
```
> **Status Check**: The server runs on `http://localhost:5001`. A `GET /` request should return a 200 OK status.

---

## 🎨 Frontend Deployment (Client UI)

The frontend is a Vite-optimized React application interfacing with the Flask API.

### 1. Install Node Modules

```bash
cd frontend

# Install clean dependencies
npm ci
# OR
npm install
```

### 2. Start Dev Server

```bash
npm run dev
```
> **Access**: The application will be available at `http://localhost:5173`. Make sure the backend port matches the API calls in `frontend/src/Pages/predict/Predict.jsx` (default 5001).

---

## 🧪 API Specification

### Endpoint: `/predict`
*   **Method**: `POST`
*   **Content-Type**: `application/json`

#### Request Payload
```json
{
  "Age": 21,
  "Gender": 0,                // 0: Male, 1: Female
  "GPA": 3.8,
  "Stress_Level": 2,          // 0-4 Scale
  "Anxiety_Score": 10,        // GAD-7 Scale equivalent
  "Depression_Score": 5,      // PHQ-9 Scale equivalent
  "Sleep_Hours": 7.5,
  "Steps_Per_Day": 6000,
  "Mood_Description": 2,      // Encoded categorical
  "Sentiment_Score": 0.8
}
```

#### Response Payload
```json
{
  "prediction": 0            // Class Label: 0 (Good), 1 (Moderate), 2 (Poor)
}
```

---

## 🛠 Troubleshooting

### 🐍 Serialization Errors (`ModuleNotFoundError` / `ValueError`)
*   **Symptom**: `UserWarning: Trying to unpickle estimator... version mismatch`
*   **Cause**: The model was trained on `scikit-learn==1.6.1`. Attempting to load with v1.3 or v1.7 will fail.
*   **Fix**: `pip install --force-reinstall scikit-learn==1.6.1`

### 🌐 CORS / Connection Refused
*   **Symptom**: Frontend shows "Fetch Error".
*   **Fix**: Ensure `app.py` has `CORS(app)` initialized and both servers are running. Check `http://127.0.0.1:5001` vs `localhost`.

### 📉 Model Inference Issues
*   **Symptom**: 500 Internal Server Error regarding "Feature mismatch".
*   **Fix**: The input features order must match the training/pipeline schema exactly as defined in `app.py::FEATURES`.


## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Frontend: Vite automatically reloads on file changes
- Backend: Flask debug mode reloads on Python file changes

### Testing the Assessment
Use these sample values for testing:
- Age: 20
- Gender: 0 (Female), 1 (Male), 2 (Other)
- GPA: 3.5
- Stress Level: 3 (1-5 scale)
- Anxiety Score: 5
- Depression Score: 4
- Sleep Hours: 7
- Steps Per Day: 8000
- Mood: 0-6 (Happy, Sad, Anxious, Tired, Relaxed, Stressed, Motivated)
- Sentiment Score: 0.5

## Production Build

### Frontend
```bash
cd frontend/mental-health-frontend
npm run build
```

The build output will be in the `dist` directory.

### Backend
For production deployment:
1. Set `debug=False` in app.py
2. Use a production WSGI server (e.g., Gunicorn)
3. Configure proper CORS origins
4. Set up environment variables

## Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Scikit-learn Documentation](https://scikit-learn.org/)

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the UPGRADE_NOTES.md file
3. Check browser console for errors
4. Verify backend logs

---

**Remember**: This is an educational tool. Always seek professional help for mental health concerns.

**Emergency**: Call 988 (Suicide & Crisis Lifeline) or 911 for immediate help.
