# MindCare API

Flask service that wraps the soft-voting ensemble and serves the built frontend.

## Base URL

| Context | URL |
|---|---|
| Local dev (`python app.py`) | `http://127.0.0.1:5001` |
| Docker / Compose | `http://localhost:5001` |

The Vite dev server proxies `/api/*` to port 5001, so the browser always calls `/api/predict`.

---

## `GET /health`

Also available at `GET /api/health`. Used by the Docker Compose healthcheck.

```json
{
  "status": "ok",
  "model_loaded": true,
  "model_name": "mental_health_model_ensemble_soft.pkl"
}
```

`model_name` reflects the first artifact found in this priority order:

1. `mental_health_model_production.pkl`
2. `mental_health_model_ensemble_soft.pkl`
3. `mental_health_model_ensemble_hard.pkl`
4. `mental_health_model.pkl`

---

## `POST /predict`

Also registered as `POST /api/predict`. Both accept and return identical payloads.

### Request

All ten fields are required.

```json
{
  "Age": 21,
  "Gender": "Female",
  "GPA": 3.2,
  "Stress_Level": 4,
  "Anxiety_Score": 14,
  "Depression_Score": 16,
  "Sleep_Hours": 5.5,
  "Steps_Per_Day": 4200,
  "Mood_Description": "Anxious",
  "Sentiment_Score": -0.4
}
```

| Field | Type | Accepted range | Notes |
|---|---|---|---|
| `Age` | number | 17 – 45 | |
| `Gender` | string \| int | `Female` `Male` `Other`, or `0` `1` `2` | Case-insensitive |
| `GPA` | number | 1.0 – 4.0 | |
| `Stress_Level` | number | 1 – 5 | Self-reported |
| `Anxiety_Score` | number | 0 – 21 | GAD-7 scale |
| `Depression_Score` | number | 0 – 27 | PHQ-9 scale |
| `Sleep_Hours` | number | 3 – 9 | Nightly average |
| `Steps_Per_Day` | number | 2000 – 12000 | |
| `Mood_Description` | string \| int | `Happy` `Sad` `Anxious` `Tired` `Relaxed` `Stressed` `Motivated`, or `0`–`6` | Case-insensitive |
| `Sentiment_Score` | number | -1.0 – 1.0 | |

Values outside these bounds are rejected — they fall outside the training distribution, so a
prediction there would be extrapolation rather than inference.

### Success — `200`

```json
{
  "prediction": 2,
  "label": "Struggling",
  "confidence": 0.7961,
  "probabilities": {
    "Healthy": 0.0043,
    "At Risk": 0.1996,
    "Struggling": 0.7961
  }
}
```

| `prediction` | `label` | Meaning |
|---|---|---|
| `0` | Healthy | No elevated risk indicated |
| `1` | At Risk | Moderate concerns present |
| `2` | Struggling | Professional support recommended |

`confidence` and `probabilities` are only present when the loaded model exposes
`predict_proba` (true for the soft-voting ensemble, false for hard voting).

### Errors

| Status | Example | Cause |
|---|---|---|
| `400` | `{"error": "Missing: Sleep_Hours, Steps_Per_Day"}` | Required fields absent |
| `400` | `{"error": "Field 'GPA' must be a number"}` | Wrong type |
| `400` | `{"error": "Field 'Age' must be between 17 and 45"}` | Out of range |
| `400` | `{"error": "Gender must be one of: Female, Male, Other (or 0/1/2)"}` | Unknown category |
| `500` | `{"error": "Model not loaded. Check server logs."}` | No artifact found at startup |
| `500` | `{"error": "Prediction failed. Please try again."}` | Inference error; details go to the server log only |

---

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173,http://127.0.0.1:5173` | Comma-separated allowlist applied to `/api/*` |
| `FLASK_DEBUG` | unset (off) | Set to `1` to enable the reloader/debugger locally |
| `HOST` | `127.0.0.1` | Bind address for `python app.py` only |

In Docker the frontend is served from the same origin, so CORS is not involved. Gunicorn binds
`0.0.0.0:5001` via the `CMD` in the Dockerfile and ignores the `__main__` block entirely.

---

## Examples

### cURL

```bash
curl -X POST http://127.0.0.1:5001/api/predict \
  -H "Content-Type: application/json" \
  -d '{"Age":21,"Gender":"Female","GPA":3.2,"Stress_Level":4,"Anxiety_Score":14,
       "Depression_Score":16,"Sleep_Hours":5.5,"Steps_Per_Day":4200,
       "Mood_Description":"Anxious","Sentiment_Score":-0.4}'
```

### Python

```python
import requests

payload = {
    "Age": 21, "Gender": "Female", "GPA": 3.2,
    "Stress_Level": 4, "Anxiety_Score": 14, "Depression_Score": 16,
    "Sleep_Hours": 5.5, "Steps_Per_Day": 4200,
    "Mood_Description": "Anxious", "Sentiment_Score": -0.4,
}

response = requests.post("http://127.0.0.1:5001/api/predict", json=payload, timeout=10)
response.raise_for_status()
print(response.json())
```

### JavaScript

```javascript
const response = await fetch("/api/predict", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

const result = await response.json();
if (!response.ok) throw new Error(result.error);
```

---

## Not implemented

No rate limiting, authentication, or request logging beyond Flask defaults. Add a reverse proxy
or WSGI middleware before exposing this service publicly.
