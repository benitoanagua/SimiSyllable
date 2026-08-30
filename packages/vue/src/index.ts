import type { App, Plugin } from 'vue';
import '@handheld/components';

export const HandheldVue: Plugin = {
  install(app: App) {
    app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('hh-');
  },
};

export const registerHandheld = () => HandheldVue;

declare module 'vue' {
  interface GlobalComponents {
    'hh-button': HTMLElement;
    'hh-icon': HTMLElement;
    'hh-icon-button': HTMLElement;
    'hh-input': HTMLElement;
    'hh-textarea': HTMLElement;
    'hh-checkbox': HTMLElement;
    'hh-radio': HTMLElement;
    'hh-switch': HTMLElement;
    'hh-select': HTMLElement;
    'hh-card': HTMLElement;
    'hh-badge': HTMLElement;
  }
}
