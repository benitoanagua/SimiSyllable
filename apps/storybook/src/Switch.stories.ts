import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhSwitch } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Forms/Switch',
  component: HhSwitch,
} satisfies Meta<HhSwitch>;

export default meta;

export const Default = { render: () => h('hh-switch', { label: 'Enable notifications', name: 'notifications' }) };
export const Checked = { render: () => h('hh-switch', { label: 'Enable notifications', name: 'notifications', checked: true }) };
export const Disabled = { render: () => h('hh-switch', { label: 'Enable notifications', name: 'notifications', disabled: true }) };
