# Dependency Rules

1. `@handheld/tokens` has no runtime package dependencies.
2. `@handheld/foundation` may consume tokens, but never components or adapters.
3. `@handheld/primitives` may consume tokens and foundation.
4. `@handheld/components` may consume tokens, foundation, primitives, and icons.
5. Framework adapters may consume `@handheld/components`, but never the reverse.
6. `@handheld/testing` is test infrastructure and is not part of the runtime dependency graph.
7. No HANDHELD package may depend on application/domain code.
8. Lit is forbidden. React/Vue/Angular are not runtime dependencies of core packages.
9. Consumers must not depend on internal source paths.
