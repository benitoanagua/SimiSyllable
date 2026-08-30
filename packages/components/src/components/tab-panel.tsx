import { Component, Element, Prop, h } from '@stencil/core';

@Component({ tag: 'hh-tab-panel', styleUrl: 'tabs.css', shadow: false })
export class HhTabPanel {
  @Element() host!: HTMLElement;
  @Prop() value!: string;
  render() {
    const id = `${this.host.id || `hh-tab-panel-${this.value}`}`;
    return <section id={id} class="tab-panel" role="tabpanel" aria-labelledby={`hh-tab-${this.value}`} tabIndex={0}><slot /></section>;
  }
}
