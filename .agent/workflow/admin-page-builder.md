# 🛠️ Admin Page Builder Workflow

## Purpose
Execution protocol for interacting with or expanding the visual CMS Dashboard where site structural data is modified.

## Rules
- **Data Integrity:** Only allow administrators to save configurations that perfectly match the `payload` schema required by the registered UI Sections.
- **No Markdown/Raw HTML Saving:** Form inputs must inherently restrict users to specific fields (Title field, Subtitle field). Avoid using giant WYSIWYG boxes that break structural Next.js parsing.

## Steps
1. **Form Creation:** Navigate to `src/components/admin/BuilderForm.jsx`.
2. **Dynamic Fields:** Use standard switch statements based on currently selected block type to render unique inputs (e.g., Hero selected -> display Title/Subtitle/Image url inputs).
3. **Draft State Tracking:** Use React state to track Section array sorting (`sortOrder`) entirely client-side.
4. **Database Execution:** Only execute the final `POST` or `PUT` request to `app/api/sections/route.js` when the user clicks 'Save Layout'.
