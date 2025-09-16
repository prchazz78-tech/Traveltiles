# Travel Tiles – Vibe Coding PRD

## 1. Purpose & MVP Goal
**One-Hour Goal:** Build a drag-and-drop matching game where users match 5 countries to their travel facts in under 60 seconds.

**Core Value:** Learn geography through quick, satisfying interactions—perfect for a coffee break or waiting in line.

## 2. Primary User Story
**As a curious person with 2-3 minutes to spare, I want to quickly test my geography knowledge by dragging country names onto matching facts, so I can learn something new and feel accomplished.**

## 3. Core User Flow (Single Action)
1. **Start:** User sees 5 country tiles on the left, 5 scrambled facts on the right
2. **Play:** User drags countries to facts (visual feedback on hover/drop)
3. **Complete:** Score appears with encouragement ("4/5 - Geography Expert!")
4. **Replay:** One-click reset for another round

## 4. Essential UI Components
- **Country Tiles** (left side): Draggable cards with country names
- **Fact Zones** (right side): Drop targets with travel facts
- **Score Display:** Simple "X/5 correct" with encouraging message
- **Reset Button:** "Play Again" to shuffle and restart

## 5. MVP Feature Set (30-45 min build)

### Must-Have (Core Game Loop)
- **Static Data:** Array of 5 country-fact pairs hardcoded in JavaScript
- **Drag & Drop:** HTML5 drag API with visual hover states
- **Match Logic:** Instant feedback when tiles are dropped correctly/incorrectly
- **Score Tracking:** Simple counter using React useState

### Nice-to-Have (If Time Allows)
- **Visual Polish:** Smooth CSS transitions on tile interactions
- **Shuffle Logic:** Randomize fact order on reset
- **Completion Message:** Celebratory text based on score

### Explicitly Out of Scope
- ❌ External APIs or data fetching
- ❌ User accounts or persistent storage
- ❌ Multiple game modes or difficulty levels
- ❌ Sound effects or complex animations

## 6. Technical Approach
- **Framework:** React + Vite (already scaffolded)
- **State Management:** Basic useState for score and game state
- **Styling:** CSS modules or inline styles (no external UI libs)
- **Data:** Simple JavaScript array of objects
- **Build:** Must work with `npm run dev` and `npm run build`

## 7. Data Structure (Sample)
```javascript
const countryFacts = [
  { country: "Japan", fact: "Has more than 6,800 islands" },
  { country: "Iceland", fact: "Has no mosquitoes" },
  { country: "France", fact: "Most visited country in the world" },
  { country: "Chile", fact: "Home to the driest desert on Earth" },
  { country: "Nepal", fact: "Contains 8 of the world's 10 highest peaks" }
];
```

## 8. Success Criteria
- ✅ Game loads without errors in under 3 seconds
- ✅ All 5 drag-and-drop interactions work smoothly
- ✅ Score updates correctly and displays final result
- ✅ Reset button shuffles and restarts the game
- ✅ Responsive design works on laptop screens (mobile optional)

## 9. Definition of Done
- Code is clean and readable (no complex abstractions)
- No console errors during gameplay
- All interactions provide immediate visual feedback
- Game can be completed in 30-90 seconds
- Ready to demo or share via URL