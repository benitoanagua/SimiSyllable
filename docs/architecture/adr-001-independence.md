# ADR-001: HANDHELD Independence

## Decision

HANDHELD is an independently designed design system. STRATA is allowed only as a reference for repository organization.

## Consequences

- No STRATA code is required at runtime.
- No STRATA component behavior is a contract.
- No STRATA tokens are authoritative.
- HANDHELD owns all public APIs.
- Stencil is the component runtime.
- The system remains framework-agnostic through Web Components.
