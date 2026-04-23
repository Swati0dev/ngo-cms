# ⚙️ Dynamic Rendering Skill

## Purpose
Governs the core dynamic layout engine (`pageRenderer.jsx`) that bridges Prisma Database layout data back into visual React Nodes dynamically.

## Rules
- **Central Registry System:** Every new Section created MUST be manually registered in the `SECTION_MAP` dictionary inside `src/lib/pageRenderer.jsx`.
- **Error Boundaries:** The renderer must gracefully handle unknown or outdated `type` keys from the database payload without application crash (e.g., returning `<div key={id}>Invalid section type</div>`).
- **Data Spread:** The `payload` mapped from JSON should cascade to the rendered components simply by spreading the object: `<SectionComponent {...section.payload} />`.

## Implementation Steps (When modifying the Renderer)
1. Examine the JSON structure currently returning from `app/api/pages/[slug]`. 
2. Ensure `sections` are sorted by `sortOrder` prior to the mapping `.map()` loop.
3. When registering a new type, import it exactly at the top of `pageRenderer.jsx` and insert it into `SECTION_MAP` using standard UPPER_SNAKE_CASE keys (e.g., `CARD_GRID: CardGridSection`).
