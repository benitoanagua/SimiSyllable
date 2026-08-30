import { Component, h } from '@stencil/core';

@Component({ tag: 'hh-toolbar', styleUrl: 'toolbar.css', shadow: false })
export class HhToolbar {
  render() {
    return <div class="hh-toolbar"><div class="hh-toolbar__start"><slot name="start" /></div><div class="hh-toolbar__main"><slot /></div><div class="hh-toolbar__end"><slot name="end" /></div></div>;
  }
}
