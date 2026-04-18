# Design System: Scholar’s Ink & Azure Landscape

## 1. Overview & Creative North Star
The Creative North Star for this system is **"The Digital Manuscript."** This system bridges the gap between the monumental grandeur of traditional landscapes and the focused, modern scholarly study. 

We are moving away from the "app-as-a-utility" look and toward "app-as-an-artifact." By utilizing intentional asymmetry, high-contrast serif typography, and a "layered-slate" philosophy, we create an environment that feels more like a modern archive than a standard software interface. Transitions must be fluid and organic—never "snapping" into place, but rather "bleeding" or "flowing" like ink meeting parchment.

---

## 2. Colors & Surface Philosophy
The palette is rooted in expressive tones, balanced by a cool, neutral base that provides a professional and grounded atmosphere for academic work.

### Color Tokens
- **Background (Slate/Cool Neutral):** `#6a788d` (Surface)
- **Primary (Modern Azure):** `#387abf` (Primary)
- **Secondary (Sage Green):** `#5b7f67` (Secondary)
- **Tertiary (Forest Green):** `#2b874f` (Tertiary)

### The "No-Line" Rule
The design relies on tonal shifts rather than hard outlines. **Do not use 1px solid borders for sectioning.** 
- Distinguish the navigation sidebar from the main canvas by shifting from `surface` to `surface-container-low`.
- Distinguish a card from its background by placing a `surface-container-lowest` card atop a `surface-container` background.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of technical papers and slate surfaces.
- **Base Layer:** `surface` (The primary workspace).
- **Secondary Containers:** `surface-container-low` (Navigation rails).
- **Interactive Cards:** `surface-container-lowest` (The highest "lift," appearing as the freshest sheet of paper).
- **Signature Texture:** Apply a subtle 3% opacity grain/noise overlay to the entire UI to simulate the tactile tooth of archival paper.

### The Glass & Gradient Rule
Use the **"Ink Spread" Gradient** for primary CTAs: a subtle transition from `primary` to `primary-container`. This adds depth that a flat fill cannot achieve. For floating toolbars, use **Glassmorphism**: semi-transparent `surface` with a 20px backdrop blur to let the underlying colors show through the frosted pane.

---

## 3. Typography: Scholarly Editorial
The system uses **Noto Serif** to evoke the timeless quality of printed manuscripts. The typography is a structural element.

- **Display (The Artist's Seal):** `display-lg` (3.5rem) should be used sparingly for empty states or cover titles, often aligned vertically to mimic traditional styles.
- **Headline (Chapter Titles):** `headline-md` (1.75rem) provides the scholarly weight needed for notebook sections.
- **Body (The Manuscript):** `body-lg` (1rem) is the workhorse. Line height is set to provide a balanced, readable density (standard "Normal" spacing).
- **LaTeX Support:** Mathematical formulas should be rendered in a high-contrast serif font that matches the Noto Serif weight, ensuring academic rigor feels integrated into the aesthetic.

---

## 4. Elevation & Depth
Elevation is achieved through **Tonal Layering** and **Ambient Shadows**, never through heavy dark drops.

- **The Layering Principle:** Softness is paramount. A `surface-container-highest` element (like a modal) should sit on a dimmed `surface` background to create natural separation.
- **Ambient Shadows:** For "floating" palettes or "Intent Anchors," use a shadow with a blur radius of 32px and a 5% opacity, using the `on-surface` color. It should feel like a soft glow of light.
- **The "Ghost Border" Fallback:** If a boundary is strictly required for accessibility, use the `outline-variant` token at **15% opacity**. It should be barely perceptible.

---

## 5. Components

### The Folding Album (Cards)
Cards feature subtle roundedness (`roundedness: 1`). Instead of a shadow, use a `surface-container-highest` background to provide depth.
- **Silk Mounting:** Add a 4px left-hand border using an "ink wash" gradient (`primary-fixed-dim` to `primary`) to simulate the binding of a traditional document.

### Buttons (Modern Ink Aesthetic)
- **Primary:** Filled with an Azure gradient (`primary-container`). No border. High-contrast text.
- **Secondary (Sage):** Used for supporting actions. A text-only button with a `secondary` color.
- **Tertiary (Forest Green):** Used for specialized highlighting or interactive badges.

### Minimalist Navigation
The navigation is modern and efficient, using `surface-variant` with a 15% transparency to blend into the workspace.

### Input Fields (The Scholar's Desk)
Text inputs should not be boxes. Use a single bottom stroke (the "Ghost Border") that expands into a Forest Green (`tertiary`) stroke upon focus.

---

## 6. Do's and Don'ts

### Do:
- **Embrace Tonal Separation:** Rely on the `expressive` color palette to define regions rather than physical dividers.
- **Maintain Clear Density:** Use "Normal" spacing to keep information accessible while maintaining a scholarly feel.
- **Organic Motion:** Use "Ease-in-out" curves for all transitions to mimic the movement of water or ink.

### Don't:
- **No Divider Lines:** Never use a horizontal line to separate list items. Use vertical spacing instead.
- **No Pure Black:** Avoid `#000000`. Use the slate neutral or `on-surface` for deep tones to keep the palette organic.
- **No Hard Grids:** Avoid "boxed-in" layouts. Elements should feel like they are placed on the surface, not trapped in a spreadsheet.
- **No High-Contrast Borders:** Never use a 100% opaque `outline`. It breaks the illusion of the tonal environment.

---

*This document serves as the foundation for all future iterations of the interface. When in doubt, ask: "Does this look like a modern scholarly artifact?"*