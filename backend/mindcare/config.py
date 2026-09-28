import os
from pathlib import Path


BACKEND_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = BACKEND_DIR / "static"
MODEL_DIR = BACKEND_DIR / "models"

MODEL_CANDIDATES = tuple(
    MODEL_DIR / name
    for name in (
        "mental_health_model_production.pkl",
        "mental_health_model_ensemble_soft.pkl",
        "mental_health_model_ensemble_hard.pkl",
        "mental_health_model.pkl",
    )
)

DEFAULT_CORS_ORIGINS = os.environ.get(
    "CORS_ALLOWED_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173",
)