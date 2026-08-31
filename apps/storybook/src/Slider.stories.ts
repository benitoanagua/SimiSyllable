import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhSlider } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Forms/Slider',
  component: HhSlider,
} satisfies Meta<HhSlider>;

export default meta;

export const Default = { render: () => h('hh-slider', { label: 'Volume', value: 40 }) };
export const WithValueLabel = { render: () => h('hh-slider', { label: 'Volume', value: 65, showValue: true }) };
export const Range = { render: () => h('hh-slider', { label: 'Brightness', min: 0, max: 200, step: 5, value: 100, showValue: true }) };
export const Disabled = { render: () => h('hh-slider', { label: 'Volume', value: 40, disabled: true }) };
