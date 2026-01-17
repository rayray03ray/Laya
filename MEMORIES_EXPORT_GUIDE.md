# Memories Tab - Export Guide for Developers

## Overview
The Memories Tab consists of 3 main screens that are now export-ready with all layers visible.

## Screen Exports Available

### Screen 22: Memories Timeline (`MemoriesScreen_Timeline`)
**Component:** `/src/app/components/MemoriesScreen_Timeline.tsx`

**What's Visible:**
- ✅ Header: "Our Journey" with tagline
- ✅ Cold Start Prompts (horizontal scroll chips)
- ✅ **Vertical Dashed Timeline** (FIXED - now visible throughout)
- ✅ Timeline nodes (dots connecting cards)
- ✅ Polaroid-style memory cards (alternating left/right)
- ✅ Handwritten fonts (Caveat) for dates and titles
- ✅ Paper grain texture on cards
- ✅ Beige Flag badges
- ✅ Jump to Start button
- ✅ FAB (Plus button)

**Key Fix:**
The vertical dashed line now uses:
- `position: absolute` with explicit `height: 100%`
- `backgroundImage` with repeating-linear-gradient
- Proper z-index layering (line: 1, cards: 2, nodes: 3)

**To Export:**
Navigate to "22: Memories Timeline" in the Demo Navigator

---

### Screen 23: Add Memory Form (`MemoriesScreen_AddForm`)
**Component:** `/src/app/components/MemoriesScreen_AddForm.tsx`

**What's Visible:**
- ✅ Header with close button
- ✅ Photo upload area (camera icon placeholder)
- ✅ Title input field
- ✅ Date picker
- ✅ Story/note textarea
- ✅ **Special Occasion section** (highlighted in Sunbeam Yellow)
- ✅ Toggle for "Mark as Special Occasion"
- ✅ Conditional "Remind us every year?" section (visible when toggle is ON)
- ✅ Save Memory CTA button

**Key Features:**
- The form is fully scrollable
- Special Occasion section uses yellow (#F7B731) highlighting
- Calendar integration copy is visible
- Toggle switches show both states

**To Export:**
1. Navigate to "23: Add Memory Form" in the Demo Navigator
2. To see the "Remind Annually" section, toggle "Mark as Special Occasion" to ON
3. Export both states (toggle OFF and toggle ON)

---

### Screen 24: Memory Detail View (`MemoriesScreen_DetailView`)
**Component:** `/src/app/components/MemoriesScreen_DetailView.tsx`

**What's Visible:**
- ✅ Dark overlay background (rgba blur)
- ✅ White detail card (centered)
- ✅ Edit and Share action buttons
- ✅ Close button
- ✅ Large photo display
- ✅ Handwritten title (Caveat font, 36px)
- ✅ Handwritten date (Caveat font, 24px)
- ✅ Full story/note text
- ✅ Beige Flag badge (if applicable)
- ✅ Special Occasion badge (if applicable)

**Key Features:**
- Centered modal layout
- Badges displayed inline
- Example shows a memory with BOTH badges for demo

**To Export:**
Navigate to "24: Memory Detail" in the Demo Navigator

---

## Integration with Main App

The Memories Tab is also integrated into the Home Dashboard:
- Access via bottom navigation "Memories" tab
- Full interactive experience with animations
- Modals appear on top of timeline view

---

## Technical Notes for Developers

### Why Separate Export Screens?
The original `MemoriesTab.tsx` uses:
- `position: fixed` for modals (can be clipped during export)
- `AnimatePresence` for conditional rendering (modals only show when state is true)
- Interactive state management (makes static export difficult)

The export screens (`MemoriesScreen_*`) provide:
- Static, always-visible layouts
- No animation dependencies
- Predictable rendering for screenshots/exports
- All layers properly positioned

### Vertical Dashed Line Fix
**Before:**
```tsx
background: 'repeating-linear-gradient(to bottom, #C9B79C 0, #C9B79C 10px, transparent 10px, transparent 20px)'
```
This was getting clipped because the container didn't have explicit height.

**After:**
```tsx
position: 'absolute',
height: '100%',  // Explicit height
backgroundImage: 'repeating-linear-gradient(0deg, #C9B79C, #C9B79C 10px, transparent 10px, transparent 20px)',
zIndex: 1  // Proper layering
```

### Font Loading
Ensure `Caveat` font is loaded (already added to `/src/styles/fonts.css`):
```css
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
```

---

## Design Tokens Used

**Colors:**
- Background: `#FFFCF8` (warm white)
- Sandstone: `#F2E8DA`
- Terracotta: `#8E075F`
- Sunbeam Yellow: `#F7B731`
- Text Primary: `#3D2E28`
- Text Secondary: `#8B7355`
- Timeline Line: `#C9B79C`

**Typography:**
- Handwritten: `Caveat, cursive`
- Body: `var(--laya-font-body)` (Nunito)
- Headline: `var(--laya-font-headline)` (EB Garamond)

**Spacing:**
- Card padding: `16px`
- Section gaps: `20px`, `24px`, `32px`
- Border radius: Cards `4px`, Inputs `16px`, Buttons `24px`

---

## Export Checklist

- [ ] Screen 22: Timeline view (with visible dashed line)
- [ ] Screen 23: Add Form (toggle OFF state)
- [ ] Screen 23: Add Form (toggle ON state showing "Remind Annually")
- [ ] Screen 24: Detail view (with badges)

**Pro Tip:** Use the Demo Navigator (menu icon, bottom-right) to quickly jump between screens for export!
