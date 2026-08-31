import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhRadio } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Forms/Radio',
  component: HhRadio,
} satisfies Meta<HhRadio>;

export default meta;

export const Group = {
  render: () => h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
    h('hh-radio', { name: 'plan', value: 'basic', label: 'Basic', checked: true }),
    h('hh-radio', { name: 'plan', value: 'pro', label: 'Pro' }),
    h('hh-radio', { name: 'plan', value: 'enterprise', label: 'Enterprise' }),
  ),
};
export const Disabled = { render: () => h('hh-radio', { name: 'plan', value: 'basic', label: 'Basic', disabled: true }) };
