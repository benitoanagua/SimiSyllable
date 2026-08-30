import { Component, Prop, h } from '@stencil/core';

@Component({ tag: 'hh-nav', styleUrl: 'nav.css', shadow: false })
export class HhNav {
  @Prop() orientation: 'horizontal' | 'vertical' = 'vertical';
  render() { return <nav class={`nav-list is-${this.orientation}`}><slot /></nav>; }
}
