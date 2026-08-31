import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhPagination } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Navigation/Pagination',
  component: HhPagination,
} satisfies Meta<HhPagination>;

export default meta;

export const Default = { render: () => h('hh-pagination', { page: 1, pageCount: 10 }) };
export const MiddlePage = { render: () => h('hh-pagination', { page: 5, pageCount: 10 }) };
export const WideSiblings = { render: () => h('hh-pagination', { page: 5, pageCount: 20, siblingCount: 2 }) };
