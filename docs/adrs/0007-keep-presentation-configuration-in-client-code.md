# ADR 0007: Keep presentation configuration in client code

- Status: Accepted
- Date: 2026-08-20

## Context

The original static cafe demo stores business content and presentation
configuration in the same JavaScript CONFIG object.

The production system needs administrators to manage cafe information such as
the brand name, about text, menu, opening hours, social links and contact
information.

Colors, typography, layout, responsive breakpoints and component styling are
application presentation concerns and do not currently need to be changed by
cafe administrators.

Persisting presentation configuration would increase the API surface,
validation requirements and coupling between the backend and Next.js without
a demonstrated product requirement.

## Decision

Persist business-managed content in PostgreSQL and expose it through the
Spring Boot API.

Keep presentation concerns such as colors, typography, layout and component
styling in the Next.js application.

Media will be handled separately through the media module and object storage.

## Consequences

- Administrators manage business content without controlling application CSS.
- The backend remains independent of Next.js-specific presentation details.
- Frontend changes continue through normal code review and deployment.
- Adding administrator-selectable themes later would require a new decision
  and API contract.