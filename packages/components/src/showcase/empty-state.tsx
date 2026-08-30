import { Component, Prop, h } from '@stencil/core';

@Component({ tag: 'hh-empty-state', styleUrl: 'empty-state.css', shadow: false, scoped: true })
export class HhEmptyState {
  @Prop() heading = '';
  @Prop() description = '';

  render() {
    return (
      <section class="hh-empty-state">
        <div class="hh-empty-state__icon"><slot name="icon"><hh-icon name="inbox" aria-label=""></hh-icon></slot></div>
        <h3>{this.heading}</h3>
        {this.description ? <p>{this.description}</p> : null}
        <div class="hh-empty-state__actions"><slot name="actions" /></div>
      </section>
    );
  }
}
