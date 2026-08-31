import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhFileUpload } from '@handheld/components';

const meta = {
  title: 'HANDHELD/Components/Forms/FileUpload',
  component: HhFileUpload,
} satisfies Meta<HhFileUpload>;

export default meta;

export const Default = { render: () => h('hh-file-upload', { label: 'Attachments' }) };
export const ImagesOnly = { render: () => h('hh-file-upload', { label: 'Profile photo', accept: 'image/*', dropzoneText: 'Drag an image here or ' }) };
export const Multiple = { render: () => h('hh-file-upload', { label: 'Documents', multiple: true }) };
export const WithError = { render: () => h('hh-file-upload', { label: 'Attachments', error: 'File exceeds the size limit' }) };
export const Disabled = { render: () => h('hh-file-upload', { label: 'Attachments', disabled: true }) };
