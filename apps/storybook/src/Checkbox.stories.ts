import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhCheckbox } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Forms/Checkbox',
  component: HhCheckbox,
} satisfies Meta<HhCheckbox>;

export default meta;

export const Default = { render: () => h('hh-checkbox', { label: 'Accept terms', name: 'terms' }) };
export const Checked = { render: () => h('hh-checkbox', { label: 'Accept terms', name: 'terms', checked: true }) };
export const Disabled = { render: () => h('hh-checkbox', { label: 'Accept terms', name: 'terms', disabled: true }) };
export const Required = { render: () => h('hh-checkbox', { label: 'Accept terms', name: 'terms', required: true }) };
