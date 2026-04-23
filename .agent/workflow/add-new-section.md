# ➕ Add New Section Workflow

## Purpose
A strict, ordered workflow an agent must follow when asked to implement a new layout element (e.g., adding an 'FAQ' section to the website).

## Rules
- **No Direct HTML Dumping:** Do not inject static FAQ HTML onto a Next.js page. You must build out the generic abstraction mapping.
- **Top-Down Execution:** Always begin with Atomic components, wrap them in Sections, define them in the Registry, and lastly allow the API mapping payload.

## Steps
1. **Component Check:** Do the required atomic components (e.g. `Accordion.jsx`) already exist in `src/components/blocks/`? If not, create them.
2. **Build Section Wrapper:** Create `src/components/sections/NewSectionName.jsx`. Implement mapping for the expected JSON payload so it distributes downward into atomic components.
3. **Register Section:** Open `src/lib/pageRenderer.jsx`.
   - Add standard Import.
   - Insert key into `SECTION_MAP` (e.g., `FAQ: FAQSection`).
4. **Admin UI Implementation:** Update the Builder (`src/components/admin/BuilderForm.jsx`) to include the form fields that will generate the exact JSON payload the new Section requires.
