# MindCare AI Docker Overview

A clean deployment path for this project is now available with a single full-stack image.

## Deployment Snapshot

- Runtime: Python 3.11 + Gunicorn
- Frontend build: Vite production bundle
- Serving model: Flask API + static frontend from one container
- Health endpoint: /health
- Default app URL: http://localhost:5001

## Image and Registry

- Image name: tuta699/mental-health-stress-detector
- Requested tag example: tagname

## Fast Path

1. Build image:
   docker build -t tuta699/mental-health-stress-detector:tagname .

2. Run container:
   docker run -d --name mindcare-app -p 5001:5001 tuta699/mental-health-stress-detector:tagname

3. Push to Docker Hub:
   docker login
   docker push tuta699/mental-health-stress-detector:tagname

## Compose Path

Use docker-compose.yml from the repository root:

- Build + run:
  docker compose up -d --build

- Stop:
  docker compose down

## Tagging Strategy (Recommended)

Use semantic versions in addition to latest:

- docker build -t tuta699/mental-health-stress-detector:v2.1.0 .
- docker push tuta699/mental-health-stress-detector:v2.1.0
- docker tag tuta699/mental-health-stress-detector:v2.1.0 tuta699/mental-health-stress-detector:latest
- docker push tuta699/mental-health-stress-detector:latest

## API Notes

The frontend now calls /api/predict by default. In development, Vite proxies /api to http://localhost:5001. In Docker, both frontend and backend are served from the same container, so no extra proxy setup is needed.

The backend accepts either:

- String categories (recommended)
  - Gender: Female, Male, Other
  - Mood_Description: Happy, Sad, Anxious, Tired, Relaxed, Stressed, Motivated

- Numeric aliases
  - Gender: 0, 1, 2
  - Mood_Description: 0 to 6

## Production Reminder

Keep only required model artifacts in backend/models for leaner image builds and faster deployments.
