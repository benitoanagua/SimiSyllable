import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhButton } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Button',
  component: HhButton,
} satisfies Meta<HhButton>;

export default meta;

export const Primary = {
  render: () => h('hh-button', null, 'Continue'),
};

export const Secondary = {
  render: () => h('hh-button', { variant: 'secondary' }, 'Cancel'),
};

export const WithIcons = {
  render: () =>
    h(
      'hh-button',
      null,
      h('hh-icon', { slot: 'start', name: 'plus' }),
      'Create',
    ),
};
