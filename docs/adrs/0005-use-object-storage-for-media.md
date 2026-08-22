# ADR 0005: Use object storage for media

- Status: Accepted
- Date: 2026-08-18

## Context

The demo references remote image URLs directly. Production content needs managed uploads, metadata, size/type validation and durable storage independent of application instances.

## Decision

Store image metadata in PostgreSQL and bytes in S3-compatible object storage. Use MinIO locally and a managed object store in production. Prefer signed uploads/downloads where practical.

Public media is initially read through the application API while the
storage abstraction remains independent of that delivery mechanism.

Privileged upload, replacement and deletion endpoints are intentionally
deferred until admin OIDC authentication and authorization are in place.
The project will not expose temporary unauthenticated media write endpoints.

## Consequences

- Backend instances remain stateless with respect to files.
- Media lifecycle, orphan cleanup, quotas and CDN/cache behavior need explicit ownership.
