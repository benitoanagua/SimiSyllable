import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhAvatar } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Surface/Avatar',
  component: HhAvatar,
} satisfies Meta<HhAvatar>;

export default meta;

export const Initials = { render: () => h('hh-avatar', { name: 'Ada Lovelace' }) };
export const WithImage = { render: () => h('hh-avatar', { name: 'Ada Lovelace', src: 'https://i.pravatar.cc/64?img=5' }) };
export const Sizes = {
  render: () => h('div', { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
    h('hh-avatar', { name: 'Ada Lovelace', size: 'small' }),
    h('hh-avatar', { name: 'Ada Lovelace', size: 'medium' }),
    h('hh-avatar', { name: 'Ada Lovelace', size: 'large' }),
  ),
};
export const Status = {
  render: () => h('div', { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
    h('hh-avatar', { name: 'Ada Lovelace', status: 'online' }),
    h('hh-avatar', { name: 'Ada Lovelace', status: 'busy' }),
    h('hh-avatar', { name: 'Ada Lovelace', status: 'away' }),
    h('hh-avatar', { name: 'Ada Lovelace', status: 'offline' }),
  ),
};
export const Square = { render: () => h('hh-avatar', { name: 'Ada Lovelace', shape: 'square' }) };
