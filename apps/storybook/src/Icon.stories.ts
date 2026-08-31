import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhIcon } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Actions/Icon',
  component: HhIcon,
} satisfies Meta<HhIcon>;

export default meta;

export const Default = { render: () => h('hh-icon', { name: 'star' }) };
export const WithAriaLabel = { render: () => h('hh-icon', { name: 'info-circle', 'aria-label': 'Information' }) };
export const Gallery = {
  render: () => h('div', { style: { display: 'flex', gap: '12px' } },
    ['home', 'search', 'settings', 'bell', 'user', 'calendar'].map((n) => h('hh-icon', { name: n })),
  ),
};
