import { stencilContent } from './story-helpers';

export default { title: 'HANDHELD/Visual/State Matrix' };

export const Controls = {
  render: () => stencilContent(`
      <div style="display:grid;gap:32px;padding:32px;max-width:960px;background:var(--hh-color-background);color:var(--hh-color-text)">
        <section style="display:grid;gap:12px">
          <h2>Buttons</h2>
          <div style="display:flex;gap:12px;flex-wrap:wrap">
            <hh-button>Default</hh-button>
            <hh-button disabled>Disabled</hh-button>
            <hh-button loading>Loading</hh-button>
            <hh-button variant="secondary">Secondary</hh-button>
            <hh-button variant="danger">Danger</hh-button>
          </div>
        </section>
        <section style="display:grid;gap:12px;max-width:420px">
          <h2>Fields</h2>
          <hh-input label="Default" placeholder="Value"></hh-input>
          <hh-input label="Error" error="This value is invalid" value="invalid"></hh-input>
          <hh-input label="Disabled" disabled value="Disabled"></hh-input>
          <hh-textarea label="Textarea" hint="Supporting text"></hh-textarea>
        </section>
        <section style="display:flex;gap:16px;align-items:center">
          <hh-badge tone="neutral">Neutral</hh-badge>
          <hh-badge tone="info">Info</hh-badge>
          <hh-badge tone="success">Success</hh-badge>
          <hh-badge tone="warning">Warning</hh-badge>
          <hh-badge tone="danger">Danger</hh-badge>
        </section>
      </div>
    `),
};
