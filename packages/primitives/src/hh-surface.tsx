import { Component, Prop, h } from '@stencil/core';

@Component({ tag: 'hh-surface', styleUrl: 'hh-surface.css', shadow: false })
export class HhSurface {
  @Prop() elevated = false;
  render() {
    return <div class={{ surface: true, elevated: this.elevated }}><slot /></div>;
  }
}
