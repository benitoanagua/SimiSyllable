import type { Meta } from '@storybook/web-components-vite';
const meta: Meta = { title: 'HANDHELD/Components/Button' };
export default meta;
export const Primary = { render: () => ({ template: '<hh-button>Continue</hh-button>' }) };
export const Secondary = { render: () => ({ template: '<hh-button variant="secondary">Cancel</hh-button>' }) };
export const WithIcons = { render: () => ({ template: '<hh-button><hh-icon slot="start" name="add"></hh-icon>Create</hh-button>' }) };
