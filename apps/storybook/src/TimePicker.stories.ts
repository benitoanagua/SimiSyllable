import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhTimePicker } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Forms/TimePicker',
  component: HhTimePicker,
} satisfies Meta<HhTimePicker>;

export default meta;

export const Default = { render: () => h('hh-time-picker', { label: 'Meeting time' }) };
export const WithValue = { render: () => h('hh-time-picker', { label: 'Meeting time', value: '14:30' }) };
export const WithStep = { render: () => h('hh-time-picker', { label: 'Meeting time', step: 900 }) };
export const Disabled = { render: () => h('hh-time-picker', { label: 'Meeting time', disabled: true, value: '09:00' }) };
