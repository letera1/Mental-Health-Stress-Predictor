[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
$Python = Join-Path $Root ".venv\Scripts\python.exe"

if (-not (Test-Path $Python)) {
    throw "Python environment not found. Run: python -m venv .venv"
}

$Backend = "Set-Location '$Root\backend'; &'$Python' app.py"
$Frontend = "Set-Location '$Root\frontend'; npm run dev"

Start-Process pwsh -ArgumentList "-NoExit", "-Command", $Backend
Start-Process pwsh -ArgumentList "-NoExit", "-Command", $Frontend

Write-Host "Backend: http://127.0.0.1:5001" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan