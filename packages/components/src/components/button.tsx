import { Component, Element, Event, EventEmitter, Method, Prop, h } from '@stencil/core';
import type { HhButtonVariant, HhSize } from '../types';

export type HhButtonSize = HhSize;

@Component({ tag: 'hh-button', styleUrl: 'button.css', shadow: false })
export class HhButton {
  @Element() host!: HTMLElement;
  @Prop() variant: HhButtonVariant = 'primary';
  @Prop() size: HhButtonSize = 'medium';
  @Prop() disabled = false;
  @Prop() loading = false;
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop({ attribute: 'full-width' }) fullWidth = false;
  @Event() hhPress!: EventEmitter<MouseEvent>;
  private control?: HTMLButtonElement;

  @Method()
  async focus() { this.control?.focus(); }

  private handleClick = (event: MouseEvent) => {
    if (!this.disabled && !this.loading) this.hhPress.emit(event);
  };

  render() {
    const classes = {
      'hh-button': true,
      [`is-${this.variant}`]: true,
      [`is-${this.size}`]: true,
      'is-loading': this.loading,
      'is-full': this.fullWidth,
    };

    return (
      <button
        ref={(el) => this.control = el as HTMLButtonElement}
        class={classes}
        disabled={this.disabled || this.loading}
        type={this.type}
        aria-busy={this.loading ? 'true' : undefined}
        onClick={this.handleClick}
      >
        <span class="start">{this.loading ? <hh-spinner label="Loading" /> : <slot name="start" />}</span>
        <span class="label"><slot /></span>
        <span class="end"><slot name="end" /></span>
      </button>
    );
  }
}
