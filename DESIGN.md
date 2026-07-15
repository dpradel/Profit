---
name: Profit
description: Trading platform marketing site — a precise, dark terminal-inspired brand system
colors:
  terminal-black: "#07090f"
  pure-black: "#000000"
  pure-white: "#ffffff"
  terminal-blue: "#463cff"
  signal-cyan: "#38bdf8"
  signal-blue-deep: "#0574de"
  amber-home: "#e3a081"
  muted-ink: "rgba(255, 255, 255, 0.62)"
  hairline: "rgba(255, 255, 255, 0.12)"
  glass-surface: "rgba(255, 255, 255, 0.08)"
typography:
  display:
    fontFamily: "Inter Display, Inter, sans-serif"
    fontSize: "clamp(30px, 3.8vw, 48px)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Inter, Inter Placeholder, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.68
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.1em"
rounded:
  pill: "999px"
  sm: "10px"
  md: "14px"
  lg: "18px"
  xl: "22px"
spacing:
  sm: "16px"
  md: "20px"
  lg: "64px"
  xl: "100px"
components:
  button-primary:
    backgroundColor: "{colors.signal-cyan}"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
  button-glass:
    backgroundColor: "{colors.glass-surface}"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
  button-light:
    backgroundColor: "{colors.pure-white}"
    textColor: "{colors.pure-black}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
---

# Design System: Profit

## 1. Overview

**Creative North Star: "The Signal Room"**

Profit's marketing site reads like a dark control room where one signal cuts through: a near-black terminal surface (#07090f) holds everything still, and a single deep terminal blue carries every moment of attention — CTAs, active states, glow, hover feedback. Nothing else fights for saturation. The system exists to make active traders feel like they're looking at a professional instrument, not a consumer landing page: real product screenshots inside precise, gradient-bordered device chrome, animated with restraint (parallax, hover reveals) rather than choreography for its own sake.

This system explicitly rejects the generic AI-SaaS grammar: no cream/sand backgrounds, no gradient-clip text, no tiny uppercase eyebrow stacked above every single section, no numbered 01/02/03 scaffolding without a real sequence behind it, no identical icon-card grids, no side-stripe borders, no decorative glass "because it looks premium." Where glass and blur appear (device bezels, hover cards, floating info panels), they exist because a real trading terminal or premium hardware would render that way — not as page-wide decoration.

**Key Characteristics:**
- Near-black terminal ground (#07090f) — never pure white, never warm-tinted.
- One accent family (terminal/signal blue) carries essentially all color; everything else is white-on-black at varying opacity.
- Precision over prettiness: hairline borders, exact 1px strokes, tight radii, real product screenshots over illustration.
- Depth through blur, drop-shadow glow, and layered z-index — never through drenched gradients.
- Motion is functional (parallax = depth cue, hover = state feedback), matched by a `prefers-reduced-motion` fallback everywhere it appears.

## 2. Colors

A near-monochrome dark system: black ground, white ink at varying opacity, and one deep blue that owns all emphasis.

### Primary
- **Signal Cyan** (#38bdf8): The active/interactive accent — CTA gradients, hover glows, eyebrow labels, focus states. This is the only color allowed to feel "alive" on the page.
- **Terminal Blue** (#463cff): The deeper root of the accent family; appears in the primary CTA gradient (`#62d9ff → #38bdf8 → #0a80e8 → #0574de → #0d5ed6`) and in device-frame glow shadows.

### Neutral
- **Terminal Black** (#07090f): Primary section background across Multiplataforma, Depoimentos, and matched into Corretoras Parceiras so section seams stay imperceptible.
- **Pure Black** (#000000): Used sparingly for the deepest recesses (original Corretoras background prior to unification; still used in device-lid interiors).
- **Pure White** (#ffffff): Headline ink, always at full opacity — body copy never runs at full white.
- **Muted Ink** (rgba(255,255,255,0.62)): Standard body/paragraph color. This is the workhorse neutral; do not go lighter/more-transparent than this for anything that must be read as body text.
- **Hairline** (rgba(255,255,255,0.12)): Borders, dividers, chip outlines.
- **Glass Surface** (rgba(255,255,255,0.08)): Frosted panel fills (hover cards, glass buttons, floating info blocks) — always paired with `backdrop-filter: blur()`.

### Named Rules
**The One Signal Rule.** Only the terminal/signal blue family carries hue. Every other color on the page is black, white, or white-at-opacity. If a new element needs emphasis, reach for more blue glow or more opacity — never a second accent hue.

**The Matched Ground Rule.** Adjacent sections must share the exact same base background color (#07090f) with symmetric top/bottom fade masks at the seam. A visible color step between two stacked sections is a bug, not a stylistic choice (this was a real defect fixed this cycle: Corretoras Parceiras was #000 while Multiplataforma/Depoimentos were #07090f, producing a visible seam).

## 3. Typography

**Display Font:** Inter Display (with Inter, sans-serif fallback)
**Body Font:** Inter (with Inter Placeholder, sans-serif fallback)
**Label Font:** Inter, uppercase, wide-tracked

**Character:** A single type family carrying every role, differentiated by weight and size rather than a second face — technical and precise, the way a trading terminal's own UI would set type. Inter Display is reserved for the largest display moments only.

### Hierarchy
- **Display** (700, `clamp(30px, 3.8vw, 48px)`, line-height 1.1, letter-spacing -0.03em): Section H2s (e.g. "Windows, macOS, iOS, Android e Web.").
- **Body** (400, 16px, line-height 1.68): Section lead/supporting paragraphs. Cap at ~60ch measure.
- **Label / Eyebrow** (600, 11px, letter-spacing 0.1em, uppercase, signal cyan at 75% opacity): Section kickers (`.sec-eyebrow`) — used once per section, never stacked with a redundant second label.
- **Micro-label** (400, 11px, `rgba(255,255,255,0.45)`): Device hover-card subtitles, float-block descriptive lines — the smallest, quietest tier.

### Named Rules
**The Single Voice Rule.** No second font family is introduced for "variety." Every new component reuses Inter/Inter Display at a new weight or size step before reaching for a different face.

## 4. Elevation

Depth comes from layered drop-shadows, backdrop blur, and z-index staging — never from a boxed card shadow sitting flat on the page. Device mockups (monitor/laptop/tablet/phone) each carry their own colored glow (`drop-shadow` with a blue-tinted rgba), scaled to the device's visual weight, so nearer/larger objects cast a stronger glow than smaller ones.

### Shadow Vocabulary
- **Device — heavy glow** (`drop-shadow(0 48px 96px rgba(0,0,0,0.9)) drop-shadow(0 0 80px rgba(28,80,255,0.28)) drop-shadow(0 0 160px rgba(42,100,255,0.12))`): Largest/nearest device in a composition (e.g. the laptop).
- **Device — medium glow** (`drop-shadow(0 28px 64px rgba(0,0,0,0.88)) drop-shadow(0 0 56px rgba(28,80,255,0.22))`): Mid-scale devices (tablet).
- **Device — light glow** (`drop-shadow(0 24px 56px rgba(0,0,0,0.92)) drop-shadow(0 0 40px rgba(28,80,255,0.26))`): Smallest device (phone) — proportionally tighter blur radius.
- **Glass panel** (`backdrop-filter: blur(8–12px)` + `rgba(255,255,255,0.04–0.08)` fill + `1px rgba(255,255,255,0.08–0.1)` border): Hover cards, floating info blocks, device bezels.
- **CTA glow** (`box-shadow: 0 4px 20px rgba(5,116,222,0.35)`, hover: layered ring + halo up to `0 0 42px 14px rgba(5,116,222,0.2)`): Primary buttons only.

### Named Rules
**The Backdrop-Filter Stacking-Context Rule.** `backdrop-filter` silently stops working on any element inside an ancestor that has its own `filter` (e.g. a parent with `drop-shadow`). If a glass panel needs to sit inside a device-position wrapper that also needs a drop-shadow, put the `filter` on the *hover-wrap* layer and the `backdrop-filter` panel as a sibling outside that filtered subtree — never nest them, or the blur silently renders as flat.

## 5. Components

Every interactive surface should feel **premium and weighted**: smooth `cubic-bezier` easing, glass or gradient materials with intent, glow as feedback rather than decoration — matching the tactile realism of this cycle's device-mockup work (gradient borders via background-clip, backdrop blur bezels, hover-driven scale/dim).

### Buttons
- **Shape:** Full pill (`border-radius: 999px`), `min-height: 41px`, `padding: 0 20px` (compact variant: 33px / 16px).
- **Primary / Gradient:** Animated gradient fill (`#62d9ff → #38bdf8 → #0a80e8 → #0574de → #0d5ed6`, `background-size: 300% 300%`, 7s drift), white text, resting glow `0 4px 20px rgba(5,116,222,0.35)`; hover adds a layered halo ring.
- **Glass / Dark:** `rgba(255,255,255,0.15)` fill with `backdrop-filter: blur(18px)`, white text — used where a button sits over imagery/gradients rather than flat black.
- **Light:** Solid white fill, black text — highest-contrast variant, used sparingly against the darkest backgrounds.
- **Hover / Focus:** Transitions run on `box-shadow` at `1.1s cubic-bezier(0.4, 0, 0.2, 1)` — slow and weighted, never a snap.

### Device Mockups (signature component)
The composition's most distinctive pattern: monitor / laptop / tablet / phone rendered as realistic hardware, gradient-bordered via the background-clip technique (`background: linear-gradient(bg,bg) padding-box, linear-gradient(135deg, rgba(255,255,255,0.22)…) border-box`), each with independent mouse-parallax (lerped toward cursor position, amplitude scaled to depth — nearer devices move more) plus a per-device sine-wave float offset. On hover: the hovered device scales up and comes to front (`z-index` swap via `:has()`), siblings scale down and dim to 0.5 opacity, and a glass hover-card (device name + one-line description) fades in, tracking the same parallax offset as the device itself via shared CSS custom properties (`--dx`/`--dy`) so the label never drifts from the hardware it's labeling.

### Cards / Containers
- **Corner style:** 10–22px depending on scale (chip-level elements go full pill).
- **Background:** Never a flat opaque card; either true glass (`rgba(255,255,255,0.04–0.08)` + blur) or borderless with a hairline divider.
- **Border:** 1px `rgba(255,255,255,0.08–0.12)` hairline — never a colored side-stripe.

### Section Kicker (Eyebrow)
- **Style:** 11px, 600 weight, 0.1em tracking, uppercase, `rgba(100,200,255,0.75)`, `margin-bottom: 14px`.
- **Rule:** One per section, immediately above the H2. Never repeated as a secondary label lower on the same section.

## 6. Do's and Don'ts

### Do:
- **Do** keep every section's base background at exactly `#07090f`, with matched top/bottom fade masks at each seam so transitions between sections are imperceptible.
- **Do** use the signal-blue family as the only source of hue on the page; everything else is black/white/opacity.
- **Do** give every animated element (parallax, hover reveal, gradient drift) a `prefers-reduced-motion` fallback.
- **Do** route any positional offset (parallax translate) through shared CSS custom properties when a label/card must visually track a moving element, rather than animating them independently.
- **Do** use real product screenshots inside device chrome to demonstrate capability — this is a "show, don't tell" brand.

### Don't:
- **Don't** introduce cream/sand/warm-tinted backgrounds — this is a dark, near-black terminal system, always.
- **Don't** use gradient-clip text for emphasis; use weight or the signal-blue color instead.
- **Don't** stack a tiny uppercase eyebrow above every section as reflexive scaffolding — one per section, and only because it's the established pattern here, not because "landing pages do this."
- **Don't** use numbered 01/02/03 section markers unless the content is a genuine ordered sequence.
- **Don't** use `border-left`/`border-right` as a colored accent stripe on any card or list item.
- **Don't** nest a `backdrop-filter` element inside an ancestor that has its own `filter` (e.g. `drop-shadow`) — the blur will silently stop rendering; keep glass panels outside filtered subtrees.
- **Don't** let a second accent hue creep in "just this once" — if something needs to stand out, use more signal-blue glow, not a new color.
