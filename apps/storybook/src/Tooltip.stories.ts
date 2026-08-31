import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhTooltip } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Overlays/Tooltip',
  component: HhTooltip,
} satisfies Meta<HhTooltip>;

export default meta;

export const Top = {
  render: () => h('hh-tooltip', { text: 'Helpful context', placement: 'top' },
    h('hh-icon', { name: 'info-circle', 'aria-label': 'Information' }),
  ),
};
export const Bottom = {
  render: () => h('hh-tooltip', { text: 'Helpful context', placement: 'bottom' },
    h('hh-icon', { name: 'info-circle', 'aria-label': 'Information' }),
  ),
};
