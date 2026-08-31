import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhTabs } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Navigation/Tabs',
  component: HhTabs,
} satisfies Meta<HhTabs>;

export default meta;

export const Default = {
  render: () => h('hh-tabs', { value: 'overview' },
    h('div', { slot: 'tablist', style: { display: 'flex', gap: '4px' } },
      h('hh-tab', { value: 'overview', active: true }, 'Overview'),
      h('hh-tab', { value: 'activity' }, 'Activity'),
      h('hh-tab', { value: 'settings', disabled: true }, 'Settings'),
    ),
    h('hh-tab-panel', { value: 'overview' }, 'Overview content.'),
    h('hh-tab-panel', { value: 'activity' }, 'Activity content.'),
    h('hh-tab-panel', { value: 'settings' }, 'Settings content.'),
  ),
};
