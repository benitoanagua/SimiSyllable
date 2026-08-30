import { stencilContent } from './story-helpers';

export default {
  title: 'HANDHELD/Quality/Production Matrix',
};

const controls = `
  <div style="display:grid;gap:24px;max-width:720px">
    <section><h3>Actions</h3><div style="display:flex;gap:12px;flex-wrap:wrap">
      <hh-button variant="primary">Primary</hh-button>
      <hh-button variant="secondary">Secondary</hh-button>
      <hh-button variant="danger">Delete</hh-button>
      <hh-button loading>Saving</hh-button>
      <hh-icon-button name="search" label="Search"></hh-icon-button>
    </div></section>
    <section style="display:grid;gap:12px"><h3>Forms</h3>
      <hh-input label="Email" value="person@example.com" hint="We'll never share your email"></hh-input>
      <hh-input label="Invalid" error="Enter a valid value" value="bad"></hh-input>
      <hh-textarea label="Message" rows="4"></hh-textarea>
      <hh-checkbox label="Remember me"></hh-checkbox>
      <hh-radio name="matrix" value="one" label="Option one"></hh-radio>
      <hh-radio name="matrix" value="two" label="Option two"></hh-radio>
      <hh-switch label="Notifications"></hh-switch>
      <hh-select label="Country"><option value="bo">Bolivia</option><option value="ar">Argentina</option></hh-select>
    </section>
    <section><h3>Composition</h3><hh-card interactive><span slot="header">Interactive card</span>Keyboard accessible content.<span slot="footer"><hh-badge tone="success">Ready</hh-badge></span></hh-card></section>
    <section><h3>Navigation & disclosure</h3>
      <hh-tabs value="one"><hh-tab value="one">Overview</hh-tab><hh-tab value="two">Details</hh-tab><hh-tab-panel slot="panel" value="one">Overview content</hh-tab-panel><hh-tab-panel slot="panel" value="two">Details content</hh-tab-panel></hh-tabs>
      <br/><hh-accordion><hh-accordion-item value="a" label="First section">First content.</hh-accordion-item><hh-accordion-item value="b" label="Second section">Second content.</hh-accordion-item></hh-accordion>
      <br/><hh-nav><hh-nav-item active href="#overview">Overview</hh-nav-item><hh-nav-item href="#settings">Settings</hh-nav-item></hh-nav>
    </section>
  </div>`;

export const Production = { render: () => stencilContent(controls) };
