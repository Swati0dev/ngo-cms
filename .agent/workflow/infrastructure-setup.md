# 🏗️ Infrastructure & Setup Workflow

## Purpose
Establishes the foundational constraints for initializing the Next.js project, connecting the Neon Database, and preparing for production deployment on Vercel.

## Rules
- **Stack Consistency:** Strictly use Next.js App Router. No mixing with older PHP stacks.
- **Database Architecture:** Prisma must be configured exclusively for Neon Serverless PostgreSQL.
- **Vercel Readiness:** The codebase must remain stateless and Vercel-compatible (e.g., no localized file system data saving, strictly use Neon DB for persistence).

## Steps
1. **Next.js Init:** Initialize project via CLI (`npx create-next-app`). Configure Vanilla CSS (No Tailwind unless approved).
2. **Database Connect:** Install Prisma ORM. Configure `schema.prisma` and `.env` to hit the Neon URL.
3. **Production Build-time Guardrails:**
  - **Dynamic Optimization:** Public routes MUST include `export const dynamic = 'force-dynamic'` to prevent stale builds.
  - **Build-Phase Bypass:** API routes MUST include a `NEXT_PHASE === 'phase-production-build'` check to prevent database connection crashes during static analysis.
  - **Middleware Convention:** Use `src/proxy.js` instead of `middleware.js` to satisfy Next.js 16 deprecation warnings.
