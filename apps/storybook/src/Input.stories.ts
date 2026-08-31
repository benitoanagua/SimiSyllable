import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhInput } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Forms/Input',
  component: HhInput,
} satisfies Meta<HhInput>;

export default meta;

export const Default = { render: () => h('hh-input', { label: 'Email', placeholder: 'you@example.com' }) };
export const WithHint = { render: () => h('hh-input', { label: 'Email', hint: "We'll never share your email." }) };
export const WithError = { render: () => h('hh-input', { label: 'Email', error: 'Enter a valid email address', value: 'not-an-email' }) };
export const Password = { render: () => h('hh-input', { label: 'Password', type: 'password' }) };
export const Disabled = { render: () => h('hh-input', { label: 'Email', disabled: true, value: 'locked@example.com' }) };
export const Readonly = { render: () => h('hh-input', { label: 'Reference code', readonly: true, value: 'REF-2026-0831' }) };
