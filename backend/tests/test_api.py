def test_health_reports_model_status(client):
    response = client.get("/health")

    assert response.status_code == 200
    assert response.get_json() == {
        "status": "ok",
        "model_loaded": True,
        "model_name": "stub-model.pkl",
    }


def test_prediction_returns_model_response(client, valid_payload):
    response = client.post("/api/predict", json=valid_payload)

    assert response.status_code == 200
    assert response.get_json()["label"] == "At Risk"
    assert response.get_json()["confidence"] == 0.75


def test_prediction_rejects_missing_fields(client, valid_payload):
    valid_payload.pop("Sleep_Hours")

    response = client.post("/api/predict", json=valid_payload)

    assert response.status_code == 400
    assert response.get_json() == {"error": "Missing: Sleep_Hours"}


def test_prediction_rejects_values_outside_training_range(client, valid_payload):
    valid_payload["Age"] = 99

    response = client.post("/api/predict", json=valid_payload)

    assert response.status_code == 400
    assert response.get_json() == {"error": "Field 'Age' must be between 17 and 45"}