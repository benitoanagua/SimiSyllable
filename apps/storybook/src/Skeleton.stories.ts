import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhSkeleton } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Feedback/Skeleton',
  component: HhSkeleton,
} satisfies Meta<HhSkeleton>;

export default meta;

export const Text = { render: () => h('hh-skeleton', { variant: 'text', width: '220px' }) };
export const Circle = { render: () => h('hh-skeleton', { variant: 'circle', width: '48px', height: '48px' }) };
export const Rect = { render: () => h('hh-skeleton', { variant: 'rect', width: '280px', height: '140px' }) };
export const CardPlaceholder = {
  render: () => h('div', { style: { display: 'flex', gap: '12px', alignItems: 'center' } },
    h('hh-skeleton', { variant: 'circle', width: '40px', height: '40px' }),
    h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
      h('hh-skeleton', { variant: 'text', width: '160px' }),
      h('hh-skeleton', { variant: 'text', width: '100px' }),
    ),
  ),
};
