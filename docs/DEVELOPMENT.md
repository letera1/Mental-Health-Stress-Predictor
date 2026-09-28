# Development Guide

## Requirements

- Python 3.11+
- Node.js 22+
- npm 10+
- Docker Desktop (optional)

## One-time setup

```powershell
git clone https://github.com/letera1/Mental-Health-Stress-Predictor.git
cd Mental-Health-Stress-Predictor

python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r backend\requirements-dev.txt

cd frontend
npm ci
cd ..
```

Copy `.env.example` to `.env` only when overriding defaults. Never commit the
resulting `.env` file.

## Run locally

Start both services in separate terminals:

```powershell
.\scripts\dev.ps1
```

Or run them manually:

```powershell
cd backend
..\.venv\Scripts\python.exe app.py
```

```powershell
cd frontend
npm run dev
```

- Frontend: <http://localhost:5173>
- Backend: <http://127.0.0.1:5001>
- Health: <http://127.0.0.1:5001/health>

This is a Flask application. Do not use a FastAPI/Uvicorn command.

## Quality checks

```powershell
.\scripts\check.ps1
```

Pass `-Install` to recreate project dependencies before checking.

## Source layout

```text
backend/
  mindcare/          Flask package
  models/            serialized model artifacts
  tests/             API and validation tests
  notebooks/         offline research and training

frontend/src/
  app/               router and shell
  components/        reusable components
  pages/             lazy-loaded route components
  providers/         React providers
  lib/               domain and persistence helpers
  styles/            Tailwind entry stylesheet
```

## Environment variables

| Name | Default | Purpose |
| --- | --- | --- |
| `HOST` | `127.0.0.1` | Local Flask bind address |
| `FLASK_DEBUG` | `false` | Flask development debugger |
| `CORS_ALLOWED_ORIGINS` | local Vite origins | Comma-separated API allowlist |
| `VITE_API_BASE_URL` | `/api` | Frontend API prefix |