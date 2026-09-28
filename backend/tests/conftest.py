import pytest

from mindcare import create_app


class StubModelService:
    is_loaded = True
    model_name = "stub-model.pkl"

    def predict(self, normalized):
        return {
            "prediction": 1,
            "label": "At Risk",
            "confidence": 0.75,
            "probabilities": {
                "Healthy": 0.1,
                "At Risk": 0.75,
                "Struggling": 0.15,
            },
        }


@pytest.fixture()
def client(tmp_path):
    app = create_app(
        {
            "TESTING": True,
            "MODEL_SERVICE": StubModelService(),
            "STATIC_DIR": tmp_path,
        }
    )
    return app.test_client()


@pytest.fixture()
def valid_payload():
    return {
        "Age": 21,
        "Gender": "Female",
        "GPA": 3.2,
        "Stress_Level": 4,
        "Anxiety_Score": 14,
        "Depression_Score": 16,
        "Sleep_Hours": 5.5,
        "Steps_Per_Day": 4200,
        "Mood_Description": "Anxious",
        "Sentiment_Score": -0.4,
    }