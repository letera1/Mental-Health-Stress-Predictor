# API Documentation

## Base URL
```
http://localhost:5000
```

## Endpoints

### 1. Health Check
**GET** `/`

Returns a simple message to verify the API is running.

**Response:**
```
Mental Health Prediction API - POST to /predict
```

---

### 2. Mental Health Prediction
**POST** `/predict`

Predicts mental health status based on student data.

**Request Body:**
```json
{
  "Age": 20,
  "Gender": 0,
  "GPA": 3.5,
  "Stress_Level": 3,
  "Anxiety_Score": 10,
  "Depression_Score": 8,
  "Sleep_Hours": 7,
  "Steps_Per_Day": 6000,
  "Mood_Description": 2,
  "Sentiment_Score": 0.5
}
```

**Field Descriptions:**

| Field | Type | Range | Description |
|-------|------|-------|-------------|
| Age | Integer | 17-45 | Student's age |
| Gender | Integer | 0-2 | 0=Female, 1=Male, 2=Other |
| GPA | Float | 1.0-4.0 | Grade Point Average |
| Stress_Level | Integer | 1-5 | Self-perceived stress (1=Low, 5=High) |
| Anxiety_Score | Integer | 0-21 | Anxiety assessment score |
| Depression_Score | Integer | 0-27 | Depression assessment score |
| Sleep_Hours | Float | 3-9 | Average hours of sleep per night |
| Steps_Per_Day | Integer | 2000-12000 | Daily physical activity |
| Mood_Description | Integer | 0-6 | Current mood (0=Happy, 1=Sad, 2=Anxious, 3=Tired, 4=Relaxed, 5=Stressed, 6=Motivated) |
| Sentiment_Score | Float | -1 to 1 | Overall sentiment (-1=Very Negative, 0=Neutral, 1=Very Positive) |

**Success Response:**
```json
{
  "prediction": 0
}
```

**Prediction Values:**
- `0` = Good mental health
- `1` = Moderate concerns
- `2` = Poor mental health (seek help)

**Error Responses:**

Missing fields (400):
```json
{
  "error": "Missing: Age, Gender"
}
```

Invalid data (400):
```json
{
  "error": "could not convert string to float: 'invalid'"
}
```

Model not loaded (500):
```json
{
  "error": "Model not loaded. Check server logs."
}
```

---

## CORS

The API has CORS enabled and accepts requests from any origin during development.

---

## Machine Learning Model

The API uses an **Ensemble Soft Voting** model that combines multiple algorithms:
- Random Forest
- Decision Tree
- Extra Trees
- K-Nearest Neighbors
- Linear SVC

The ensemble approach provides more accurate and robust predictions than single algorithms.

---

## Rate Limiting

Currently, there is no rate limiting implemented. For production deployment, consider adding rate limiting middleware.

---

## Example Usage

### Using cURL:
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "Age": 20,
    "Gender": 0,
    "GPA": 3.5,
    "Stress_Level": 3,
    "Anxiety_Score": 10,
    "Depression_Score": 8,
    "Sleep_Hours": 7,
    "Steps_Per_Day": 6000,
    "Mood_Description": 2,
    "Sentiment_Score": 0.5
  }'
```

### Using Python:
```python
import requests

data = {
    "Age": 20,
    "Gender": 0,
    "GPA": 3.5,
    "Stress_Level": 3,
    "Anxiety_Score": 10,
    "Depression_Score": 8,
    "Sleep_Hours": 7,
    "Steps_Per_Day": 6000,
    "Mood_Description": 2,
    "Sentiment_Score": 0.5
}

response = requests.post("http://localhost:5000/predict", json=data)
print(response.json())
```

### Using JavaScript (Fetch):
```javascript
const data = {
  Age: 20,
  Gender: 0,
  GPA: 3.5,
  Stress_Level: 3,
  Anxiety_Score: 10,
  Depression_Score: 8,
  Sleep_Hours: 7,
  Steps_Per_Day: 6000,
  Mood_Description: 2,
  Sentiment_Score: 0.5
};

fetch('http://localhost:5000/predict', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then(response => response.json())
  .then(data => console.log(data));
```
