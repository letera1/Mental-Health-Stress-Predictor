# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

FROM python:3.11-slim AS runtime

ARG APP_VERSION=dev
ARG VCS_REF=unknown

LABEL org.opencontainers.image.title="MindCare" \
      org.opencontainers.image.description="Privacy-first student mental wellness assessment" \
      org.opencontainers.image.version="${APP_VERSION}" \
      org.opencontainers.image.revision="${VCS_REF}" \
      org.opencontainers.image.source="https://github.com/letera1/Mental-Health-Stress-Predictor" \
      org.opencontainers.image.licenses="MIT"

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    GUNICORN_CMD_ARGS="--bind=0.0.0.0:5001 --workers=2 --timeout=120 --access-logfile=- --error-logfile=-"

WORKDIR /app

COPY backend/requirements.txt /app/backend/requirements.txt
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

RUN groupadd --system mindcare && useradd --system --gid mindcare --home /app mindcare

COPY --chown=mindcare:mindcare backend/ /app/backend/
COPY --chown=mindcare:mindcare VERSION /app/VERSION
COPY --chown=mindcare:mindcare --from=frontend-builder /app/frontend/dist /app/backend/static

WORKDIR /app/backend
USER mindcare

EXPOSE 5001

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:5001/health', timeout=3)"

CMD ["gunicorn", "app:app"]
