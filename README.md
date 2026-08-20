# Kirikopi Cafe - production portfolio build

This repository turns the original hard-coded Cinnamon & Clay demo into a production-style portfolio system while keeping the architecture intentionally small enough to understand end-to-end.

## Target architecture

- `public-web`: Next.js public website.
- `admin-flutter`: Flutter admin application.
- `backend`: Spring Boot modular monolith and REST API.
- `infra`: local infrastructure, starting with PostgreSQL.
- `docs/adrs`: Architecture Decision Records.
- `docs/architecture`: diagrams and system design.
- `docs/runbooks`: operational procedures.
- `.github`: CI, security, PR policy, CODEOWNERS and dependency automation.

The first implemented vertical slice is **Catalog Read**: PostgreSQL -> Spring Boot -> REST -> Next.js.

## Local prerequisites

- Git
- Docker Desktop
- Java 21
- Maven 3.6.3+
- Node.js 24 LTS
- npm
- Flutter stable

## First run

Copy the local environment template:

```powershell
Copy-Item .env.example .env
```

Start PostgreSQL:

```powershell
docker compose --env-file .env -f infra/compose.yaml up -d
```

Run the backend in terminal 1:

```powershell
Set-Location backend
$env:DB_URL = "jdbc:postgresql://localhost:5432/kirikopi"
$env:DB_USER = "kirikopi"
$env:DB_PASSWORD = "change-me-locally"
mvn spring-boot:run
```

Verify:

```powershell
Invoke-RestMethod http://localhost:8080/actuator/health
Invoke-RestMethod http://localhost:8080/api/v1/catalog/menu
```

Run the public website in terminal 2:

```powershell
Set-Location public-web
npm install
$env:BACKEND_INTERNAL_URL = "http://localhost:8080"
npm run dev
```

Open `http://localhost:3000`.

## Repository governance

Use short-lived branches:

```text
feat/<short-description>
fix/<short-description>
docs/<short-description>
refactor/<short-description>
test/<short-description>
ci/<short-description>
chore/<short-description>
```

Use Conventional Commits, for example:

```text
feat(catalog): expose public menu endpoint
fix(web): handle catalog API timeout
ci(security): add Trivy filesystem scan
```

The repository includes local commit-message validation plus server-side CI checks. Configure the GitHub ruleset described in `docs/runbooks/github-repository-rules.md` after pushing the repository.

## Build roadmap

1. Foundation and catalog read path - included here.
2. Content, contact, review and gallery modules; migrate the rest of the demo data.
3. Admin OIDC authentication and RBAC.
4. Flutter admin CRUD for catalog/content/reviews/media.
5. S3-compatible media storage with local MinIO and production cloud object storage.
6. Audit log, optimistic locking, publish/unpublish workflow.
7. Observability, dashboards, deployment, backup/restore, release automation and SLOs.

See `docs/architecture/delivery-plan.md` for the PR-sized learning sequence.
