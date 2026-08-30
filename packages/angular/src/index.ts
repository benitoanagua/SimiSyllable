import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@handheld/components';

@NgModule({ schemas: [CUSTOM_ELEMENTS_SCHEMA] })
export class HandheldModule {}

export const HANDHELD_CUSTOM_ELEMENTS_SCHEMA = CUSTOM_ELEMENTS_SCHEMA;
