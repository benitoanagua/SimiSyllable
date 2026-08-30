import '@handheld/tokens/tokens.css';
import '@handheld/tokens/themes.css';
import '@handheld/components';
import '@handheld/primitives';

export const parameters = {
  controls: { expanded: true },
  a11y: { test: 'todo' },
  backgrounds: { default: 'handheld' },
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
