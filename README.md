# HANDHELD Design System

HANDHELD is a design system built from scratch with Stencil, TypeScript and Web Components.

## Principles

- STRATA is used only as a repository-organization reference.
- No STRATA component logic, tokens, visual rules, APIs or behavior are inherited.
- Tabler Icons is the only icon family used by HANDHELD.
- `hh-icon` has a deliberately minimal API: `name` and `aria-label`.
- Native HTML semantics are preferred over custom behavior.
- Components are framework-agnostic; React, Vue and Angular are adapters only.
- No business logic belongs in HANDHELD.

## Packages

- `@handheld/tokens` — design tokens and themes.
- `@handheld/foundation` — shared DOM, focus and accessibility utilities.
- `@handheld/primitives` — small layout/surface primitives.
- `@handheld/icons` — the Tabler icon data used by `hh-icon`.
- `@handheld/components` — canonical Web Components.
- `@handheld/patterns` — higher-level compositions.
- `@handheld/testing` — visual and accessibility test infrastructure.

## Icon usage

```html
<hh-icon name="search"></hh-icon>
```

Accessible icon:

```html
<hh-icon name="search" aria-label="Search"></hh-icon>
```

No other icon provider is supported.

## Quality gate

```bash
pnpm install
pnpm check
pnpm test:visual
```

Visual baselines cover 320×800, 375×812, 768×1024 and 1440×900.

## Showcase

Run the product-like HANDHELD showcase with:

```bash
pnpm showcase
```

Build it with:

```bash
pnpm build:showcase
```

The showcase is intentionally domain-agnostic: it demonstrates the design system without introducing business logic.
