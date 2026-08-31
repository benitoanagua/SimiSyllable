import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhIconButton } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Actions/IconButton',
  component: HhIconButton,
} satisfies Meta<HhIconButton>;

export default meta;

export const Default = { render: () => h('hh-icon-button', { name: 'plus', label: 'Add item' }) };
export const Loading = { render: () => h('hh-icon-button', { name: 'plus', label: 'Add item', loading: true }) };
export const Disabled = { render: () => h('hh-icon-button', { name: 'trash', label: 'Delete item', disabled: true }) };
export const Sizes = {
  render: () => h('div', { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
    h('hh-icon-button', { name: 'plus', label: 'Small', size: 'small' }),
    h('hh-icon-button', { name: 'plus', label: 'Medium', size: 'medium' }),
    h('hh-icon-button', { name: 'plus', label: 'Large', size: 'large' }),
  ),
};
