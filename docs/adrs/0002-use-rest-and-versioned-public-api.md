# ADR 0002: Use REST and a versioned API boundary

- Status: Accepted
- Date: 2026-08-18

## Context

Next.js and Flutter both need the backend, and the project should demonstrate a clear contract that can evolve independently of either client.

## Decision

Expose JSON REST endpoints under `/api/v1`. Use resource-oriented URLs, Problem Details for API errors, explicit DTOs, validation at the boundary, and OpenAPI documentation when the contract expands beyond the initial catalog slice.

## Consequences

- Clients do not depend on JPA/domain internals.
- Breaking changes require a deliberate versioning/migration decision.
- Contract tests become part of the definition of done.
