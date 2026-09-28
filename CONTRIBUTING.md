# Contributing to MindCare

Thank you for improving MindCare. Contributions should preserve the project's
privacy-first behavior, medical disclaimer, accessibility, and API contract.

## Development setup

1. Fork and clone the repository.
2. Create a branch from `main`: `git switch -c feat/short-description`.
3. Follow the setup in [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).
4. Run `./scripts/check.ps1` before opening a pull request.

## Pull requests

- Keep changes focused and explain the user impact.
- Add or update tests for behavior changes.
- Update documentation when public behavior or configuration changes.
- Include screenshots for visual changes at mobile and desktop widths.
- Do not commit datasets containing personal data, secrets, or credentials.
- Ensure CI passes before requesting review.

## Commit style

Use Conventional Commits where practical:

```text
feat: add assessment export
fix: reject inputs outside the model range
docs: clarify Docker release process
test: cover numeric category aliases
```

## Quality requirements

Backend:

```powershell
.\.venv\Scripts\python.exe -m ruff check backend
.\.venv\Scripts\python.exe -m pytest
```

Frontend:

```powershell
cd frontend
npm ci
npm run lint
npm audit --omit=dev
npm run build
```

## Safety and model changes

Model updates must document the dataset, evaluation method, class-level metrics,
known limitations, and artifact provenance. Never describe the output as a
diagnosis or medical advice.

By participating, you agree to follow [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).