# HANDHELD Visual System

HANDHELD is designed independently from STRATA. These are the first visual foundations and are expected to evolve through Storybook review and visual regression.

## Principles

- Mobile-first and touch-friendly.
- Semantic contrast over decorative color.
- Consistent control heights and spacing.
- Focus is always visible for keyboard users.
- Motion communicates state; it does not decorate unnecessarily.
- `prefers-reduced-motion` disables transition durations.
- Light and dark themes use the same semantic token names.
- Components consume tokens instead of hard-coded visual values.

## Responsive strategy

Prefer container-aware composition and fluid sizing. Use viewport breakpoints only for layout decisions that truly depend on the viewport.

## States

Interactive components must define default, hover, active, focus-visible, disabled and loading/error states where applicable.

## Touch

Interactive targets should normally provide at least a 44px effective hit area even when their visual glyph is smaller.
