import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhToastRegion } from '@handheld/components';
import { stencilContent } from './story-helpers';

const meta = {
  title: 'HANDHELD/Components/Overlays/Toast',
  component: HhToastRegion,
} satisfies Meta<HhToastRegion>;

export default meta;

export const Default = {
  render: () => stencilContent(`
    <hh-button onclick="document.querySelector('hh-toast-region').show({ heading: 'Saved', message: 'Your changes were saved.', tone: 'success' })">Show toast</hh-button>
    <hh-toast-region placement="bottom"></hh-toast-region>`),
};
export const TopPlacement = {
  render: () => stencilContent(`
    <hh-button onclick="document.querySelector('hh-toast-region').show({ heading: 'Heads up', message: 'A new update is available.', tone: 'info' })">Show toast</hh-button>
    <hh-toast-region placement="top"></hh-toast-region>`),
};
export const Persistent = {
  render: () => stencilContent(`
    <hh-button onclick="document.querySelector('hh-toast-region').show({ heading: 'Action required', message: 'Confirm your email address.', tone: 'warning', duration: 0 })">Show persistent toast</hh-button>
    <hh-toast-region placement="bottom"></hh-toast-region>`),
};
