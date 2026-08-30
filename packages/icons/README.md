# @handheld/icons

HANDHELD uses **Tabler Icons exclusively**.

The public API is intentionally small. Components consume `hh-icon` with a Tabler icon name. No provider abstraction, aliases, fallback collections, or alternate icon families are supported.

```html
<hh-icon name="search"></hh-icon>
```

The current registry contains only the Tabler icons required by HANDHELD. New icons must be sourced from Tabler and added with their official Tabler SVG path data.
