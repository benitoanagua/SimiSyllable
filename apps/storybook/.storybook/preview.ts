import '@handheld/tokens/tokens.css';
import '@handheld/tokens/themes.css';
import { defineCustomElements as defineComponents } from '@handheld/components/loader';
import { defineCustomElements as definePrimitives } from '@handheld/primitives/loader';

definePrimitives();
defineComponents();

export const parameters = {
  controls: { expanded: true },
  a11y: { test: 'todo' },
  backgrounds: { default: 'light' },
};

export const globalTypes = {
  theme: {
    description: 'HANDHELD theme',
    defaultValue: 'light',
    toolbar: {
      title: 'Theme',
      icon: 'mirror',
      items: ['light', 'dark'],
    },
  },
};
