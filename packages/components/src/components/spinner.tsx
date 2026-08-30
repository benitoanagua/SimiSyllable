import { Component, Prop, h } from '@stencil/core';

@Component({ tag: 'hh-spinner', styleUrl: 'spinner.css', shadow: false })
export class HhSpinner {
  @Prop() label = 'Loading';
  render() {
    return <span class="hh-spinner" role="status" aria-label={this.label} />;
  }
}
