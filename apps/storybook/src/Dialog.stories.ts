import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { HhDialog } from '@handheld/components';
import { stencilContent } from './story-helpers';

const meta = {
  title: 'HANDHELD/Components/Overlays/Dialog',
  component: HhDialog,
} satisfies Meta<HhDialog>;

export default meta;

export const Default = {
  render: () => stencilContent(`
    <hh-button onclick="document.querySelector('hh-dialog').show()">Open dialog</hh-button>
    <hh-dialog label="Confirm action">
      <p>This dialog uses the native dialog element and restores focus on close.</p>
      <span slot="footer">
        <hh-button variant="secondary" onclick="document.querySelector('hh-dialog').close()">Cancel</hh-button>
        <hh-button onclick="document.querySelector('hh-dialog').close()">Confirm</hh-button>
      </span>
    </hh-dialog>`),
};
