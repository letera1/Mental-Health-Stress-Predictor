[CmdletBinding()]
param(
    [string]$Repository = "tuta699/mental-health-stress-detector",
    [string]$Version,
    [switch]$Push
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot

if (-not $Version) {
    $Version = (Get-Content (Join-Path $Root "VERSION") -Raw).Trim()
}
if ($Version -notmatch '^\d+\.\d+\.\d+$') {
    throw "Version must use semantic versioning (for example, 3.0.0)."
}

docker info *> $null
if ($LASTEXITCODE -ne 0) {
    throw "Docker is not running. Start Docker Desktop and retry."
}

$Revision = (git -C $Root rev-parse --short HEAD).Trim()
$VersionTag = "${Repository}:${Version}"
$LatestTag = "${Repository}:latest"

docker build --pull `
    --build-arg "APP_VERSION=$Version" `
    --build-arg "VCS_REF=$Revision" `
    --tag $VersionTag `
    --tag $LatestTag `
    $Root

if ($LASTEXITCODE -ne 0) { throw "Docker build failed." }

if ($Push) {
    docker push $VersionTag
    if ($LASTEXITCODE -ne 0) { throw "Unable to push $VersionTag." }
    docker push $LatestTag
    if ($LASTEXITCODE -ne 0) { throw "Unable to push $LatestTag." }
}

Write-Host "Built $VersionTag and $LatestTag" -ForegroundColor Green