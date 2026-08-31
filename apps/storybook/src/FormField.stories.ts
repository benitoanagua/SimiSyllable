import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhFormField } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Forms/FormField',
  component: HhFormField,
} satisfies Meta<HhFormField>;

export default meta;

export const WrappingCustomControl = {
  render: () => h('hh-form-field', { label: 'Search radius', hint: 'Distance in kilometers' },
    h('hh-slider', { min: 0, max: 50, value: 10 }),
  ),
};
export const WithError = {
  render: () => h('hh-form-field', { label: 'API key', error: 'This field is required', required: true },
    h('input', { type: 'text', style: { width: '100%' } }),
  ),
};
