# 🏗️ CMS Architecture Skill

## Purpose
This document mandates the overriding layered architecture for the Next.js Mini Page Builder CMS, ensuring all backend logic, database modeling, and server-side operations remain robust and decoupled.

## Rules
- **No Hardcoding Views:** Layouts must not be baked into JSX. They must be generated via JSON mapping.
- **Strict 7-Layer Decoupling:**
  1. `UI Layer`: Next.js pages (`app/[slug]/page.jsx`) only fetch structural JSON and pass to the PageRenderer.
  2. `Section Layer`: Smart containers grouping components.
  3. `Component Layer`: Pure atomic functional elements.
  4. `Structure Layer`: JSON structures storing properties.
  5. `API Layer`: Next.js Route handlers (`app/api/*`) resolving HTTP requests without deep business logic.
  6. `Service Layer`: (`src/services/`) Abstraction layer handling pure business formatting, Prisma mapping, and validation.
  7. `Data Layer`: **Neon PostgreSQL** via Prisma ORM.

## Implementation Steps (When dealing with Architecture Changes)
1. Determine if the change applies to Presentation (UI/Section), Routing (API), or Logic (Service).
2. For database changes, update `prisma/schema.prisma` natively for PostgreSQL features (e.g. `Json` or `Jsonb` payloads).
3. If writing complex API logic, build a class in `src/services/` first, then call that service inside the API Route Handler to maintain clean abstractions.
