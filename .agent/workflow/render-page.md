# 🖥️ Render Page Workflow

## Purpose
The precise loading protocol for rendering data to the end user traversing the route: `app/[slug]/page.jsx`.

## Rules
- **Server Side Prioritization:** Since the Next.js setup uses the App Router, data fetching inside `page.jsx` must occur Server-Side directly via Prisma before returning the HTML. This is critical for SEO.
- **Never Route JSON to the Client blindly:** Abstract unnecessary Prisma metadata (like `updatedAt`) server-side; pass only what the `pageRenderer` explicitly needs as props.

## Steps
1. **Request Intercept:** Catch the `params.slug` argument from the Next.js URL.
2. **Prisma Fetch:** Execute asynchronous call `prisma.page.findUnique`. Ensure you `include: { sections: true }`.
3. **Error Handling:** If `null` is returned, trigger Next.js `notFound()`.
4. **Execution Pipeline:** Feed the structured `page.sections` array into `<PageRenderer sections={...} />`. The `PageRenderer` will govern structural layouts downstream.
