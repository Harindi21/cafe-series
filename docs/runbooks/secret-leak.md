# Secret leak runbook

1. Revoke or rotate the exposed credential immediately. Do this before history cleanup.
2. Determine where the secret was exposed: commit, PR, Actions log, container image or release artifact.
3. Remove the secret from current code/configuration.
4. If required, rewrite Git history and coordinate force updates with all contributors.
5. Invalidate caches/artifacts/images containing the secret.
6. Verify Gitleaks and provider audit logs.
7. Document the root cause and add a preventive control.

Never treat deleting the Git line as sufficient; a committed credential must be assumed compromised.
