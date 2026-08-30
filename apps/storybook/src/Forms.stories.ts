import { stencilContent } from './story-helpers';

export default { title: 'HANDHELD/Components/Forms' };
export const Fields = { render: () => stencilContent(`<div style="display:grid;gap:16px;max-width:420px"><hh-input label="Email" placeholder="you@example.com"></hh-input><hh-textarea label="Message"></hh-textarea><hh-checkbox label="Remember me"></hh-checkbox><hh-radio name="plan" value="basic" label="Basic"></hh-radio><hh-switch label="Notifications"></hh-switch><hh-select label="Country"><option value="bo">Bolivia</option><option value="ar">Argentina</option></hh-select></div>`) };
