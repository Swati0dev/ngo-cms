# 🏗️ Build Dynamic Page Workflow

## Purpose
Workflow strictly defining the process of resolving the data structures required for a brand new page route to exist structurally in the database.

## Rules
- **Database Centralized:** Pages do not exist natively as files in `/app/(public)`. A Page is solely defined by its registration inside the `Page` table in Neon PostgreSQL.
- **Slug Constraints:** The `slug` must always be processed securely, forcing lowercase and kebab-case syntax prior to Prisma execution.

## Steps
1. **API Interfacing:** Establish `POST` call logic via Next.js api routes to insert a new row in the `Page` table.
2. **Empty Section Setup:** Upon creation of a page, return the empty sections array so that the frontend catches standard 0-level state without a crash.
3. **Database Validation:** Perform a unique check inside `src/services/PageService.js` to ensure the requested `slug` doesn't conflict with existing entities.
