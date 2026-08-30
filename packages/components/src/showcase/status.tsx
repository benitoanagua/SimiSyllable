import { Component, Prop, h } from '@stencil/core';

@Component({ tag: 'hh-status', styleUrl: 'status.css', shadow: false })
export class HhStatus {
  @Prop() tone: 'neutral' | 'success' | 'warning' | 'danger' | 'info' = 'neutral';
  @Prop() label = '';

  render() {
    return <span class={`hh-status hh-status--${this.tone}`} role="status"><span class="hh-status__dot" aria-hidden="true" />{this.label || <slot />}</span>;
  }
}
