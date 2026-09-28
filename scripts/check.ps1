[CmdletBinding()]
param(
    [switch]$Install
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
$Python = Join-Path $Root ".venv\Scripts\python.exe"

if (-not (Test-Path $Python)) {
    throw "Python environment not found. Run: python -m venv .venv"
}

if ($Install) {
    & $Python -m pip install -r (Join-Path $Root "backend\requirements-dev.txt")
    Push-Location (Join-Path $Root "frontend")
    try { npm ci } finally { Pop-Location }
}

& $Python -m ruff check (Join-Path $Root "backend")
& $Python -m pytest (Join-Path $Root "backend\tests")

Push-Location (Join-Path $Root "frontend")
try {
    npm run lint
    npm audit --omit=dev
    npm run build
} finally {
    Pop-Location
}