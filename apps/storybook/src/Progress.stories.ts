import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhProgress } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Feedback/Progress',
  component: HhProgress,
} satisfies Meta<HhProgress>;

export default meta;

export const Default = { render: () => h('hh-progress', { value: 60, label: 'Uploading' }) };
export const Indeterminate = { render: () => h('hh-progress', { indeterminate: true, label: 'Loading' }) };
export const Tones = {
  render: () => h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '280px' } },
    h('hh-progress', { value: 80, tone: 'success', label: 'Success' }),
    h('hh-progress', { value: 40, tone: 'warning', label: 'Warning' }),
    h('hh-progress', { value: 20, tone: 'danger', label: 'Danger' }),
  ),
};
