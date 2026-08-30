# HANDHELD Architecture

HANDHELD is an independent design system. STRATA is referenced only for repository organization; no STRATA design, component logic, tokens, APIs, or behavior are inherited.

## Layers

`tokens → foundation → primitives/components → adapters`

Dependencies must point downward in this diagram only. Application/domain code does not belong in HANDHELD.

## Runtime

- Stencil + TypeScript
- Native Web Components / Custom Elements
- Light DOM by default
- Shadow DOM only when an explicit component contract requires isolation
- CSS custom properties for theming
- Tabler Icons used exclusively through the HANDHELD `hh-icon` API

## Icon boundary

`@handheld/icons` owns the icon registry. `@handheld/primitives` owns the `hh-icon` Web Component. Public consumers should use `hh-icon` and must not couple application code to the icon registry internals.

Tabler Icons are rendered as inline SVG nodes so HANDHELD does not require a runtime icon web-component dependency.

## Public API rules

Prefer semantic HTML, slots, typed properties, and typed custom events. Do not expose implementation dependencies or internal CSS class names as public contracts.
