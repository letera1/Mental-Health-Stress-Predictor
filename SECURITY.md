# Security Policy

## Supported versions

| Version | Supported |
| --- | --- |
| 3.x | Yes |
| 2.x and earlier | No |

## Reporting a vulnerability

Please do not open a public issue for a suspected vulnerability.

Use GitHub's **Security** tab to submit a private vulnerability report. Include:

- Affected component and version.
- Reproduction steps or a proof of concept.
- Expected impact.
- Any suggested remediation.

The maintainers will acknowledge a complete report as soon as practical,
investigate it, and coordinate disclosure after a fix is available.

## Secrets and sensitive data

- Never commit API tokens, registry credentials, or `.env` files.
- Never submit real patient, student, or personally identifiable data.
- Docker Hub credentials must be stored only as GitHub Actions secrets.

This project is an educational screening aid and must not be treated as a
medical system or a substitute for professional care.