import { stencilContent } from './story-helpers';

export default {
  title: 'HANDHELD/Components/Gallery',
};

export const Core = {
  render: () => stencilContent(`
      <div style="display:grid;gap:24px;padding:32px;max-width:900px;background:var(--hh-color-background);color:var(--hh-color-text)">
        <section style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <hh-button variant="primary"><hh-icon slot="start" name="plus"></hh-icon>Primary</hh-button>
          <hh-button variant="secondary">Secondary</hh-button>
          <hh-button variant="tertiary">Tertiary</hh-button>
          <hh-button variant="danger">Danger</hh-button>
          <hh-icon-button name="search" label="Search"></hh-icon-button><hh-spinner label="Loading"></hh-spinner>
        </section>
        <section style="display:grid;gap:16px;max-width:420px">
          <hh-input label="Email" placeholder="you@example.com" hint="Use your account email"></hh-input>
          <hh-textarea label="Message" placeholder="Write a message"></hh-textarea>
          <hh-checkbox label="Remember me"></hh-checkbox>
          <hh-radio name="choice" value="one" label="Option one"></hh-radio>
          <hh-switch label="Notifications"></hh-switch>
          <hh-select label="Country"><option value="bo">Bolivia</option><option value="ar">Argentina</option></hh-select>
        </section>
        <section style="display:grid;gap:12px">
          <hh-card>
            <span slot="header">Card header</span>
            Content area
            <span slot="footer"><hh-badge tone="success">Ready</hh-badge></span>
          </hh-card>
        </section>
      </div>
    `),
};
