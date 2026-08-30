import { Component, Element, Event, type EventEmitter, Method, Prop, h } from '@stencil/core';

@Component({ tag: 'hh-icon-button', styleUrl: 'icon-button.css', shadow: false })
export class HhIconButton {
  @Element() host!: HTMLElement;
  @Prop() name!: string;
  @Prop() label!: string;
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  @Prop() disabled = false;
  @Prop() loading = false;
  @Event() hhPress!: EventEmitter<MouseEvent>;
  private control?: HTMLButtonElement;

  @Method()
  async focus() { this.control?.focus(); }

  render() {
    return (
      <button
        ref={(el) => this.control = el as HTMLButtonElement}
        class={{ 'hh-icon-button': true, [`is-${this.size}`]: true }}
        aria-label={this.label}
        aria-busy={this.loading ? 'true' : undefined}
        disabled={this.disabled || this.loading}
        onClick={(event) => this.hhPress.emit(event)}
      >
        <hh-icon name={this.name} aria-hidden="true" />
      </button>
    );
  }
}
