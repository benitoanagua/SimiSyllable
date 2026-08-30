import { stencilContent } from './story-helpers';

export default { title: 'HANDHELD/Quality/State Matrix' };

export const States = {
  render: () => stencilContent(`
      <div style="display:grid;gap:32px;padding:32px;max-width:960px">
        <section style="display:grid;gap:12px"><h2>Buttons</h2><div style="display:flex;gap:12px;flex-wrap:wrap"><hh-button>Default</hh-button><hh-button disabled>Disabled</hh-button><hh-button loading>Loading</hh-button><hh-button variant="danger">Danger</hh-button></div></section>
        <section style="display:grid;gap:12px"><h2>Forms</h2><hh-input label="Default" placeholder="Value"></hh-input><hh-input label="Error" error="This value is invalid" value="invalid"></hh-input><hh-checkbox label="Enabled"></hh-checkbox><hh-switch label="Enabled switch"></hh-switch></section>
        <section style="display:grid;gap:12px"><h2>Disclosure</h2><hh-accordion><hh-accordion-item value="one" label="Section one">Content one</hh-accordion-item><hh-accordion-item value="two" label="Section two">Content two</hh-accordion-item></hh-accordion></section>
      </div>`)
};
