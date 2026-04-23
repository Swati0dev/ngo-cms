# Project Technical Rules & Standards

These rules are the source of truth for all technical implementations in this project. All agents must follow these to maintain consistency.

## 1. Styling & Design
- **Vanilla CSS Only**: Tailwind CSS is strictly forbidden unless explicitly requested.
- **CSS Modules**: Use `.module.css` for component-specific styles to prevent global leakage.
- **Rich Aesthetics**: Interfaces must feel premium, using smooth gradients, glassmorphism, and subtle animations.
- **Lucide Icons**: Use only `lucide-react` for all iconography.

## 2. Logic & Architecture
- **MVC-like Service Layer**: Always abstract database logic into a `Service` class (e.g., `PageService.js`). Never call Prisma directly from a Page component.
- **Next.js App Router**: Strictly use the `app/` directory with server/client component separation.
- **Strict SEO**: Every public page must include proper metadata and semantic HTML (`<h1>` hierarchy).

## 3. Database & Safety
- **Prisma ORM**: Use the singleton Prisma client from `@/lib/prisma`.
- **JSON Safety**: When working with the `Section` payload, always use null-coalescing and array checks to prevent rendering crashes.
- **Production Guards**: Always include `export const dynamic = 'force-dynamic'` on routes that fetch real-time CMS data.

## 4. Agent Execution
- **Workflow First**: Never execute a task without first identifying or creating a corresponding workflow in `.agent/workflow/`.
- **Build Verification**: Every significant UI or logic change must be followed by a `npm run build` check.
