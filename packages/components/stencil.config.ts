import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'handheld',
  sourceMap: true,
  globalStyle: 'src/styles/global.css',
  outputTargets: [
    { type: 'dist' },
    { type: 'dist-custom-elements', customElementsExportBehavior: 'single-export-module' },
  ],
  extras: { enableImportInjection: true },
};
