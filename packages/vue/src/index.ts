import type { App, Plugin } from 'vue';
import '@handheld/components';

export const HandheldVue: Plugin = {
  install(app: App) {
    app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('hh-');
  },
};


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
    'hh-avatar': HTMLElement;
    'hh-progress': HTMLElement;
    'hh-skeleton': HTMLElement;
    'hh-slider': HTMLElement;
    'hh-pagination': HTMLElement;
    'hh-breadcrumbs': HTMLElement;
    'hh-breadcrumb-item': HTMLElement;
    'hh-menu': HTMLElement;
    'hh-menu-item': HTMLElement;
    'hh-segmented-control': HTMLElement;
    'hh-segmented-item': HTMLElement;
    'hh-toast-region': HTMLElement;
    'hh-combobox': HTMLElement;
    'hh-combobox-option': HTMLElement;
    'hh-date-picker': HTMLElement;
    'hh-time-picker': HTMLElement;
    'hh-file-upload': HTMLElement;
  }
}
