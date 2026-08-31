import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhNav } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Navigation/Nav',
  component: HhNav,
} satisfies Meta<HhNav>;

export default meta;

export const Vertical = {
  render: () => h('hh-nav', { orientation: 'vertical' },
    h('hh-nav-item', { href: '#home', active: true }, 'Home'),
    h('hh-nav-item', { href: '#settings' }, 'Settings'),
    h('hh-nav-item', { href: '#billing', disabled: true }, 'Billing'),
  ),
};
export const Horizontal = {
  render: () => h('hh-nav', { orientation: 'horizontal' },
    h('hh-nav-item', { href: '#home', active: true }, 'Home'),
    h('hh-nav-item', { href: '#settings' }, 'Settings'),
  ),
};
