# ADR 0001: Use a modular monolith backend

- Status: Accepted
- Date: 2026-08-18

## Context

The product is a single cafe website plus an admin application. Independent microservices would add deployment, networking, observability and consistency overhead without a demonstrated scaling or organizational need.

## Decision

Build one Spring Boot deployable organized as domain modules: `content`, `catalog`, `reviews`, `contact`, `media`, `identity` and `audit` as needed. Use Spring Modulith to make module boundaries executable and testable.

## Consequences

- One deployment and one transactional database keep operations simple.
- Domain boundaries remain visible and can be split later if justified by load or ownership.
- CI must verify module cycles and forbidden dependencies.
