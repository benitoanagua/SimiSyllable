import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhMenu } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Navigation/Menu',
  component: HhMenu,
} satisfies Meta<HhMenu>;

export default meta;

export const Default = {
  render: () => h('hh-menu', { label: 'Actions' },
    h('hh-button', { slot: 'trigger' }, 'Open menu'),
    h('hh-menu-item', { value: 'edit' }, 'Edit'),
    h('hh-menu-item', { value: 'duplicate' }, 'Duplicate'),
    h('hh-menu-item', { value: 'delete', tone: 'danger' }, 'Delete'),
  ),
};
