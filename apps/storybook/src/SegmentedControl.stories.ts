import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhSegmentedControl } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Forms/SegmentedControl',
  component: HhSegmentedControl,
} satisfies Meta<HhSegmentedControl>;

export default meta;

export const Default = {
  render: () => h('hh-segmented-control', { label: 'View', value: 'list' },
    h('hh-segmented-item', { value: 'list', selected: true }, 'List'),
    h('hh-segmented-item', { value: 'grid' }, 'Grid'),
    h('hh-segmented-item', { value: 'map' }, 'Map'),
  ),
};
export const WithDisabledOption = {
  render: () => h('hh-segmented-control', { label: 'View', value: 'list' },
    h('hh-segmented-item', { value: 'list', selected: true }, 'List'),
    h('hh-segmented-item', { value: 'grid' }, 'Grid'),
    h('hh-segmented-item', { value: 'map', disabled: true }, 'Map'),
  ),
};
