import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhAccordion } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Surface/Accordion',
  component: HhAccordion,
} satisfies Meta<HhAccordion>;

export default meta;

export const Default = {
  render: () => h('hh-accordion', null,
    h('hh-accordion-item', { value: 'a', label: 'What is Handheld?', open: true }, 'A mobile-first component library.'),
    h('hh-accordion-item', { value: 'b', label: 'Is it accessible?' }, 'Yes, built with ARIA patterns in mind.'),
  ),
};
export const Multiple = {
  render: () => h('hh-accordion', { multiple: true },
    h('hh-accordion-item', { value: 'a', label: 'Section A', open: true }, 'Content A.'),
    h('hh-accordion-item', { value: 'b', label: 'Section B', open: true }, 'Content B.'),
  ),
};
