import logging

import joblib
import pandas as pd

from .schema import FEATURES


LOGGER = logging.getLogger(__name__)
LABELS = {0: "Healthy", 1: "At Risk", 2: "Struggling"}


class ModelService:
    def __init__(self, candidates):
        self.model = None
        self.model_name = None
        self._load(candidates)

    @property
    def is_loaded(self):
        return self.model is not None

    def _load(self, candidates):
        for path in candidates:
            if not path.exists():
                continue
            try:
                self.model = joblib.load(path)
                self.model_name = path.name
                LOGGER.info("Loaded model artifact: %s", path.name)
                return
            except Exception:
                LOGGER.exception("Unable to load model artifact: %s", path.name)
        LOGGER.error("No loadable model artifact was found")

    def predict(self, normalized):
        if not self.is_loaded:
            raise RuntimeError("Model is not loaded")

        frame = pd.DataFrame([normalized], columns=FEATURES)
        prediction = int(self.model.predict(frame)[0])
        response = {
            "prediction": prediction,
            "label": LABELS.get(prediction, "Unknown"),
        }

        if hasattr(self.model, "predict_proba"):
            probabilities = self.model.predict_proba(frame)[0]
            classes = [int(value) for value in self.model.classes_]
            response["probabilities"] = {
                LABELS.get(label, str(label)): round(float(probability), 4)
                for label, probability in zip(classes, probabilities)
            }
            response["confidence"] = round(float(max(probabilities)), 4)

        return response