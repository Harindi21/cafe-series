# ADR 0004: Use OIDC for admin authentication

- Status: Proposed
- Date: 2026-08-18

## Context

The admin application will perform privileged writes. Implementing password storage, reset flows, MFA and token issuance inside the cafe application would create unnecessary security responsibility.

## Decision

Use an OpenID Connect identity provider. The Spring API will act as an OAuth 2.0 resource server and enforce role/scope based authorization. For local development, use Keycloak; for production, the provider may be managed as long as it supports the same OIDC contract.

## Consequences

- The application owns authorization rules, not credential lifecycle.
- Local infrastructure gains one additional service when the auth slice begins.
- Admin tokens must never be placed in repository configuration or logs.
