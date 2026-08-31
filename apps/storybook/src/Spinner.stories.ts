import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhSpinner } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Feedback/Spinner',
  component: HhSpinner,
} satisfies Meta<HhSpinner>;

export default meta;

export const Default = { render: () => h('hh-spinner') };
export const CustomLabel = { render: () => h('hh-spinner', { label: 'Fetching results' }) };
