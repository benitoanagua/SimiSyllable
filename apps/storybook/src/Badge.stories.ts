import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhBadge } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Surface/Badge',
  component: HhBadge,
} satisfies Meta<HhBadge>;

export default meta;

export const Default = { render: () => h('hh-badge', null, 'Neutral') };
export const Tones = {
  render: () => h('div', { style: { display: 'flex', gap: '8px' } },
    h('hh-badge', { tone: 'neutral' }, 'Neutral'),
    h('hh-badge', { tone: 'info' }, 'Info'),
    h('hh-badge', { tone: 'success' }, 'Active'),
    h('hh-badge', { tone: 'warning' }, 'Pending'),
    h('hh-badge', { tone: 'danger' }, 'Failed'),
  ),
};
