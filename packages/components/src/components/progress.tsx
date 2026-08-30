import { Component, Prop, h } from '@stencil/core';

/** Linear progress bar. Pairs with `<hh-spinner>` (circular, indeterminate-only). */
@Component({ tag: 'hh-progress', styleUrl: 'progress.css', shadow: false, scoped: true })
export class HhProgress {
  @Prop() value = 0; // 0-100, ignored when indeterminate
  @Prop() indeterminate = false;
  @Prop() label = '';
  @Prop() tone: 'action' | 'success' | 'danger' | 'warning' = 'action';

  render() {
    const clamped = Math.min(Math.max(this.value, 0), 100);
    return (
      <div class="hh-progress">
        {this.label ? <span class="hh-progress__label">{this.label}</span> : null}
        <div
          class={{ 'hh-progress__track': true, [`is-${this.tone}`]: true, 'is-indeterminate': this.indeterminate }}
          role="progressbar"
          aria-label={this.label || undefined}
          aria-valuemin={this.indeterminate ? undefined : 0}
          aria-valuemax={this.indeterminate ? undefined : 100}
          aria-valuenow={this.indeterminate ? undefined : clamped}
        >
          <div class="hh-progress__fill" style={this.indeterminate ? undefined : { width: `${clamped}%` }} />
        </div>
      </div>
    );
  }
}
