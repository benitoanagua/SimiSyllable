import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhSelect } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Forms/Select',
  component: HhSelect,
} satisfies Meta<HhSelect>;

export default meta;

export const Default = {
  render: () => h('hh-select', { label: 'Country', name: 'country' },
    h('option', { value: 'bo' }, 'Bolivia'),
    h('option', { value: 'ar' }, 'Argentina'),
    h('option', { value: 'pe' }, 'Peru'),
  ),
};
export const WithHint = {
  render: () => h('hh-select', { label: 'Country', name: 'country', hint: 'Used for shipping estimates' },
    h('option', { value: 'bo' }, 'Bolivia'),
    h('option', { value: 'ar' }, 'Argentina'),
  ),
};
export const WithError = {
  render: () => h('hh-select', { label: 'Country', name: 'country', error: 'Please select a country' },
    h('option', { value: '' }, 'Choose...'),
    h('option', { value: 'bo' }, 'Bolivia'),
  ),
};
export const Disabled = {
  render: () => h('hh-select', { label: 'Country', name: 'country', disabled: true },
    h('option', { value: 'bo' }, 'Bolivia'),
  ),
};
