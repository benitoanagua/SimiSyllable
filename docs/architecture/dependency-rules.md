# Dependency Rules

1. `@handheld/tokens` has no runtime package dependencies.
2. `@handheld/foundation` may consume tokens, but never components or patterns.
3. `@handheld/primitives` may consume tokens and foundation.
4. `@handheld/components` may consume tokens, foundation, primitives, and icons.
5. `@handheld/patterns` may consume all lower layers, never the reverse.
6. No HANDHELD package may depend on application/domain code.
7. Lit is forbidden. React/Vue/Angular are not runtime dependencies of core packages.
8. Consumers must not depend on internal source paths.
