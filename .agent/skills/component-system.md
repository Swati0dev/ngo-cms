# 🧩 Component System Skill

## Purpose
This document governs the creation and modification of Atomic Components (e.g., Button, Card, TextBlock). It ensures that root UI elements remain strictly presentation-based without any bleed of business logic.

## Rules
- **No Side Effects:** Components within `src/components/blocks/` must NOT fetch data using `useEffect` or Next.js Server logic.
- **Purely Prop-Driven:** Every variation (colors, size, strings, links) must be driven completely by React Props.
- **Styling Segregation:** Do not use Tailwind. Use Vanilla CSS or CSS Modules (`components.module.css`). 

## Implementation Steps (When building a new Component)
1. **Define the Atomic JSX:** Create `src/components/blocks/ComponentName.jsx`.
2. **Setup Prop Interfacing:** Accept primitive types (strings, booleans). Use `variant="primary"` standardizations for styling themes.
3. **Draft the Modular CSS:** Configure matching styles in the relevant CSS file.
4. **Export Default:** Ensure standard naming conventions. An atomic component should absolutely never call an API or interact with the `Service Layer`.
