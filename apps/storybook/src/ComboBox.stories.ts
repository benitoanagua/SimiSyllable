import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhCombobox } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Forms/ComboBox',
  component: HhCombobox,
} satisfies Meta<HhCombobox>;

export default meta;

const options = () => [
  h('hh-combobox-option', { value: 'bolivia' }, 'Bolivia'),
  h('hh-combobox-option', { value: 'argentina' }, 'Argentina'),
  h('hh-combobox-option', { value: 'peru' }, 'Peru'),
  h('hh-combobox-option', { value: 'chile' }, 'Chile'),
];

export const Default = { render: () => h('hh-combobox', { label: 'Country' }, ...options()) };
export const WithHint = { render: () => h('hh-combobox', { label: 'Country', hint: 'Start typing to filter' }, ...options()) };
export const AllowCustomValue = { render: () => h('hh-combobox', { label: 'Tag', allowCustomValue: true, noResultsText: 'Press Enter to add' }, ...options()) };
export const Disabled = { render: () => h('hh-combobox', { label: 'Country', disabled: true }, ...options()) };
