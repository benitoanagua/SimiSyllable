import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhBreadcrumbs } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Navigation/Breadcrumbs',
  component: HhBreadcrumbs,
} satisfies Meta<HhBreadcrumbs>;

export default meta;

export const Default = {
  render: () => h('hh-breadcrumbs', null,
    h('hh-breadcrumb-item', { href: '#' }, 'Home'),
    h('hh-breadcrumb-item', { href: '#' }, 'Settings'),
    h('hh-breadcrumb-item', { current: true }, 'Profile'),
  ),
};
export const Collapsed = {
  render: () => h('hh-breadcrumbs', { maxItems: 3 },
    h('hh-breadcrumb-item', { href: '#' }, 'Home'),
    h('hh-breadcrumb-item', { href: '#' }, 'Products'),
    h('hh-breadcrumb-item', { href: '#' }, 'Category'),
    h('hh-breadcrumb-item', { href: '#' }, 'Subcategory'),
    h('hh-breadcrumb-item', { current: true }, 'Item'),
  ),
};
