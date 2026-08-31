import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhTextarea } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Forms/Textarea',
  component: HhTextarea,
} satisfies Meta<HhTextarea>;

export default meta;

export const Default = { render: () => h('hh-textarea', { label: 'Message' }) };
export const WithHint = { render: () => h('hh-textarea', { label: 'Message', hint: 'Max 500 characters' }) };
export const WithError = { render: () => h('hh-textarea', { label: 'Message', error: 'Message is required' }) };
export const Disabled = { render: () => h('hh-textarea', { label: 'Message', disabled: true, value: 'Locked content' }) };
export const Rows = { render: () => h('hh-textarea', { label: 'Long message', rows: 8 }) };
