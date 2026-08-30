import { stencilContent } from './story-helpers';

export default { title: 'HANDHELD/Showcase' };

export const ProductSurface = {
  render: () => stencilContent(`
      <div style="display:grid;gap:24px;padding:32px;max-width:1100px;background:var(--hh-color-background);color:var(--hh-color-text)">
        <div style="display:grid;gap:8px">
          <span style="font-size:.75rem;color:var(--hh-color-text-muted);text-transform:uppercase;letter-spacing:.08em">Composable UI</span>
          <h1 style="margin:0;font-size:clamp(2rem,5vw,3.5rem);letter-spacing:-.04em">HANDHELD in action</h1>
          <p style="margin:0;max-width:65ch;color:var(--hh-color-text-muted)">A small set of higher-level components demonstrates tokens, slots, native semantics, responsive behavior, states and Tabler iconography working together.</p>
        </div>

        <hh-alert tone="success" heading="Everything is composed from HANDHELD primitives.">No framework-specific UI logic is required.</hh-alert>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px">
          <hh-metric-card label="Components" value="20+" trend="Growing" tone="positive"><hh-icon slot="icon" name="settings"></hh-icon></hh-metric-card>
          <hh-metric-card label="A11y baseline" value="AA" trend="Built in"></hh-metric-card>
          <hh-metric-card label="Icon set" value="Tabler" trend="One source"></hh-metric-card>
        </div>

        <hh-toolbar>
          <span slot="start" style="font-weight:700">Recent items</span>
          <hh-input placeholder="Filter" aria-label="Filter items"></hh-input>
          <div slot="end"><hh-button variant="secondary"><hh-icon slot="start" name="arrow-down"></hh-icon>Export</hh-button><hh-button><hh-icon slot="start" name="plus"></hh-icon>Create</hh-button></div>
        </hh-toolbar>

        <hh-data-table caption="Recent items" columns='[{"key":"name","label":"Name"},{"key":"status","label":"Status"},{"key":"amount","label":"Amount","numeric":true}]' rows='[{"name":"Alpha","status":"Ready","amount":"$1,240"},{"name":"Beta","status":"Review","amount":"$860"},{"name":"Gamma","status":"Ready","amount":"$2,410"}]'></hh-data-table>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px">
          <hh-card><span slot="header">Composition</span><p style="margin:0;color:var(--hh-color-text-muted)">Cards, buttons, icons, fields and status elements compose without leaking implementation details.</p><span slot="footer"><hh-status tone="success">Ready</hh-status></span></hh-card>
          <hh-empty-state heading="No saved views" description="Create a view to keep your favorite filters close at hand."><hh-icon slot="icon" name="settings" aria-label=""></hh-icon><div slot="actions"><hh-button variant="secondary">Learn more</hh-button><hh-button>Create view</hh-button></div></hh-empty-state>
        </div>
      </div>
    `),
};

export const Responsive = {
  render: () => stencilContent(`<div style="padding:24px;max-width:720px"><hh-toolbar><span slot="start">Filters</span><hh-input placeholder="Search" aria-label="Search"></hh-input><div slot="end"><hh-button variant="secondary">Reset</hh-button><hh-button>Apply</hh-button></div></hh-toolbar></div>`),
};
