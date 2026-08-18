# ADR 0003: Use PostgreSQL and Flyway

- Status: Accepted
- Date: 2026-08-18

## Context

Cafe content and catalog data are relational, transactional and modest in scale. The schema must be reproducible across local, CI and production environments.

## Decision

Use PostgreSQL as the system of record and Flyway for ordered, immutable, forward migrations. Hibernate may validate the schema but must not mutate production schema automatically.

## Consequences

- Database changes are reviewable code.
- Rollback is usually an application forward-fix or explicit compensating migration, not `ddl-auto` magic.
- Integration tests run against real PostgreSQL with Testcontainers.
