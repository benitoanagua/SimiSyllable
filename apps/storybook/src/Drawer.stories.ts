import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhDrawer } from '@handheld/components';
import { stencilContent } from './story-helpers';

const meta = {
  title: 'HANDHELD/Components/Overlays/Drawer',
  component: HhDrawer,
} satisfies Meta<HhDrawer>;

export default meta;

export const Default = {
  render: () => stencilContent(`
    <hh-button onclick="document.querySelector('hh-drawer').show()">Open drawer</hh-button>
    <hh-drawer label="Navigation">
      <hh-nav>
        <hh-nav-item active href="#home">Home</hh-nav-item>
        <hh-nav-item href="#settings">Settings</hh-nav-item>
      </hh-nav>
    </hh-drawer>`),
};
export const LeftSide = {
  render: () => stencilContent(`
    <hh-button onclick="document.querySelector('hh-drawer').show()">Open drawer</hh-button>
    <hh-drawer label="Navigation" side="left">
      <hh-nav>
        <hh-nav-item active href="#home">Home</hh-nav-item>
        <hh-nav-item href="#settings">Settings</hh-nav-item>
      </hh-nav>
    </hh-drawer>`),
};
