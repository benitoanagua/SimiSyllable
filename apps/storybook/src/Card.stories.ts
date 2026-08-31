import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhCard } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Surface/Card',
  component: HhCard,
} satisfies Meta<HhCard>;

export default meta;

export const Default = {
  render: () => h('hh-card', null,
    h('span', { slot: 'header' }, 'Account'),
    h('p', null, 'Reusable content surface.'),
  ),
};
export const WithFooter = {
  render: () => h('hh-card', null,
    h('span', { slot: 'header' }, 'Account'),
    h('p', null, 'Reusable content surface.'),
    h('span', { slot: 'footer' }, h('hh-badge', { tone: 'success' }, 'Active')),
  ),
};
export const Interactive = {
  render: () => h('hh-card', { interactive: true, onHhPress: () => console.log('card pressed') },
    h('span', { slot: 'header' }, 'Clickable card'),
    h('p', null, 'This card responds to click and keyboard activation.'),
  ),
};
