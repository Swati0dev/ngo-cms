# ✅ Task Verification Workflow

## Purpose
Ensures that every task completed by an agent meets the project's production-ready standards and doesn't break the build or architectural integrity.

## Rules
- **No Skip Policy:** This workflow must be executed at the end of every significant task.
- **Strict Linting:** Zero ESLint errors or warnings are permitted in the final push.
- **Build Integrity:** `npm run build` must succeed in the local environment.

## Steps

### 1. Architectural Audit
- Verify that no Tailwind CSS has been introduced.
- Confirm all local styles are using CSS Modules.
- Ensure any new sections are registered in `src/config/section-registry.js`.

### 2. Technical Verification
- Run: `npm run build`
- Run: `npx eslint .`
- Check terminal for any Next.js hydration or runtime warnings.

### 3. Documentation Sync
- Update the `project-logs/phase-log.md` with the latest changes and audit results.
- Ensure the `master-execution-tracker.md` reflects the task's completion.

### 4. Final Review
- Click through the Admin Builder and public routes.
- Confirm that the `force-dynamic` flag is present on all dynamic pages.
