import { Component, Prop, h } from '@stencil/core';

@Component({ tag: 'hh-metric-card', styleUrl: 'metric-card.css', shadow: false, scoped: true })
export class HhMetricCard {
  @Prop() label = '';
  @Prop() value = '';
  @Prop() trend = '';
  @Prop() tone: 'neutral' | 'positive' | 'negative' = 'neutral';

  render() {
    return (
      <article class={`hh-metric-card hh-metric-card--${this.tone}`}>
        <div class="hh-metric-card__top">
          <span class="hh-metric-card__label">{this.label}</span>
          <slot name="icon" />
        </div>
        <strong class="hh-metric-card__value">{this.value}</strong>
        {this.trend ? <span class="hh-metric-card__trend">{this.trend}</span> : null}
        <slot />
      </article>
    );
  }
}
