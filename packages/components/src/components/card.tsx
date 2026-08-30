import { Component, Event, type EventEmitter, Prop, h } from '@stencil/core';

@Component({ tag: 'hh-card', styleUrl: 'card.css', shadow: false })
export class HhCard {
  @Prop() interactive = false;
  @Event() hhPress!: EventEmitter<MouseEvent | KeyboardEvent>;

  private handleKeyDown = (event: KeyboardEvent) => {
    if (!this.interactive) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.hhPress.emit(event);
    }
  };

  render() {
    return (
      <article
        class={{ card: true, interactive: this.interactive }}
        tabindex={this.interactive ? 0 : undefined}
        role={this.interactive ? 'button' : undefined}
        onClick={(event) => this.interactive && this.hhPress.emit(event)}
        onKeyDown={this.handleKeyDown}
      >
        <header><slot name="header" /></header>
        <div class="body"><slot /></div>
        <footer><slot name="footer" /></footer>
      </article>
    );
  }
}
