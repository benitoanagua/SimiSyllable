import { stencilContent } from './story-helpers';

export default { title: 'HANDHELD/Components/Surface' };
export const CardAndBadge = { render: () => stencilContent(`<hh-card><span slot="header">Account</span><p>Reusable content surface.</p><span slot="footer"><hh-badge tone="success">Active</hh-badge></span></hh-card>`) };
