# Copilot Instructions — Travel Tiles Game

> Purpose: Build **Travel Tiles**, a drag-and-drop geography matching game in under an hour. Educational, engaging, and coffee-break sized.

## Project Context
- **Game Goal:** Match 5 countries to their travel facts via drag-and-drop
- **Target User:** Curious people with 2-3 minutes to spare who want quick geography learning
- **Core Interaction:** Drag country tiles to matching fact zones, get instant feedback
- **React + Vite scaffold with focus on HTML5 drag API and visual feedback

## Travel Tiles Guardrails
- **Core Tech Stack:** React + Vite only (no additional game libraries)
- **Data Source:** Hardcoded array of 5 country-fact pairs in JavaScript
- **Drag & Drop:** Use HTML5 drag API (onDragStart, onDrop, onDragOver)
- **State Management:** Simple useState for score, gameState, and tile positions
- **Styling:** Basic CSS with hover states and visual feedback (no UI frameworks)
- **Out of Scope:** APIs, authentication, complex animations, sound effects

## Build Flow for Travel Tiles
1. **Confirm MVP:** Drag-and-drop matching game with 5 country-fact pairs
2. **Create UI Layout:** Left column (draggable countries) + Right column (drop zones with facts)
3. **Implement Drag Logic:** HTML5 drag events with visual hover feedback
4. **Add Game Logic:** Match validation, score tracking, and reset functionality
5. **Polish & Test:** Smooth interactions, encouraging completion messages

## Prompts to Use with Me (copy/paste)
- "Given this idea: <idea>, propose a *one-hour MVP* with 3–5 steps and exactly one core user action."
- "Generate the minimal JSX + state to implement that action. No extra files unless needed."
- "Refactor my App.jsx to make the code clearer, without adding libraries."
- "Create a tiny fake data source (an array or JSON) and show how to render it and filter it."
- "Add a simple result screen summarizing what the user did, without routing."
- "Suggest the smallest possible accessibility improvements for this UI."
- "Write a 3–5 bullet README snippet telling someone how to run and use this MVP."

## Quality Bar
- Works locally with `npm run dev` and builds with `npm run build`.
- No runtime errors in the console.
- Keep the bundle minimal.

## Stretch (only after MVP)
- Add routing (react-router-dom) if multiple views are essential.
- Add a small chart or animation *only if* it clarifies the outcome.
