# HANDHELD Public API Contract

The public API consists of custom element tags, public properties, slots, events and explicitly documented methods.

## Naming

- Elements: `hh-*`
- Events: `hh*`
- CSS custom properties: `--hh-*`
- TypeScript public types: `Hh*`

## Compatibility

Internal DOM structure and CSS class names are private implementation details. Consumers must not query internal descendants to control a component.

## Native behavior

Where a native element already provides the required semantics, HANDHELD wraps/enhances it instead of recreating browser behavior.

## Event rule

Emit custom events for component-level behavior that an application needs to observe. Do not emit an event merely because an internal DOM event occurred.
