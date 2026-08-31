import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhDatePicker } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Forms/DatePicker',
  component: HhDatePicker,
} satisfies Meta<HhDatePicker>;

export default meta;

export const Default = { render: () => h('hh-date-picker', { label: 'Start date' }) };
export const WithValue = { render: () => h('hh-date-picker', { label: 'Start date', value: '2026-08-31' }) };
export const WithRange = { render: () => h('hh-date-picker', { label: 'Appointment date', min: '2026-09-01', max: '2026-12-31' }) };
export const WithError = { render: () => h('hh-date-picker', { label: 'Start date', error: 'Choose a date after today' }) };
export const Disabled = { render: () => h('hh-date-picker', { label: 'Start date', disabled: true, value: '2026-08-31' }) };
