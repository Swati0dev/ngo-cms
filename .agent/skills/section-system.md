# 🧱 Section System Skill

## Purpose
Establishes protocol for building the "Smart Wrappers" inside `src/components/sections/` that translate unstructured JSON payloads into neatly arranged Atomic Components.

## Rules
- **Never Build Atomic Elements Inside a Section:** A Section must map data into existing standard blocks (e.g., using `<Button>` and `<TextBlock>`). Do not write raw `<button>` HTML natively within a Section.
- **Resilient Prop Drilling:** A Section expects deeply nested arrays and objects inside its JSON payload. Treat all incoming data as potentially undefined. Check array lengths (`payload.cards?.map()`) before execution.
- **Structural Integrity:** The Section controls layout properties (e.g., CSS Grid for a `CardGridSection`), but it delegates actual visual aesthetic (fonts, text color) down into the loaded Atomic blocks.

## Implementation Steps (When building a new Section)
1. Define the React function inside `src/components/sections/SectionName.jsx`.
2. Determine exactly what JSON payload schema it requires (e.g., a Hero section needs `title` string and `buttons` array).
3. Draft standard HTML container blocks (e.g., `<section className="hero">`).
4. Import and mount Atomic Blocks mapping the JSON payload properties into the blocks.
