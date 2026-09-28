# Docker Deployment

MindCare uses a multi-stage image: Node builds the React bundle, then a
non-root Python runtime serves the static files and Flask API through Gunicorn.

## Build and run

```powershell
.\scripts\docker-release.ps1
docker run --rm -p 5001:5001 tuta699/mental-health-stress-detector:3.0.0
```

Open <http://localhost:5001> and check:

```powershell
curl.exe http://localhost:5001/health
```

## Docker Compose

```powershell
docker compose up --build -d
docker compose ps
docker compose logs -f mindcare
docker compose down
```

Optional overrides:

```powershell
$env:MINDCARE_TAG = "3.0.0"
$env:APP_VERSION = "3.0.0"
docker compose up --build -d
```

## Publish manually

Authenticate directly in Docker Desktop or run `docker login` yourself. Do not
pass credentials through scripts or command history.

```powershell
.\scripts\docker-release.ps1 -Push
```

This publishes:

- `tuta699/mental-health-stress-detector:3.0.0`
- `tuta699/mental-health-stress-detector:latest`

## GitHub release workflow

Configure these repository secrets:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

Push a semantic version tag to publish automatically:

```powershell
git tag v3.0.0
git push origin v3.0.0
```

The workflow also supports manual dispatch from the Actions tab.

## Runtime hardening

- Runs as the unprivileged `mindcare` user.
- Includes an OCI health check and metadata labels.
- Compose uses a read-only root filesystem, `/tmp` tmpfs, dropped capabilities,
  and `no-new-privileges`.
- Training data, notebooks, tests, docs, and development dependencies are not
  copied into the image.