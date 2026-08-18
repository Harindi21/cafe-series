# ADR 0005: Use object storage for media

- Status: Proposed
- Date: 2026-08-18

## Context

The demo references remote image URLs directly. Production content needs managed uploads, metadata, size/type validation and durable storage independent of application instances.

## Decision

Store image metadata in PostgreSQL and bytes in S3-compatible object storage. Use MinIO locally and a managed object store in production. Prefer signed uploads/downloads where practical.

## Consequences

- Backend instances remain stateless with respect to files.
- Media lifecycle, orphan cleanup, quotas and CDN/cache behavior need explicit ownership.
