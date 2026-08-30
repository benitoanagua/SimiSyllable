import { Component, Event, type EventEmitter, Prop, h } from '@stencil/core';

@Component({ tag: 'hh-segmented-item', styleUrl: 'segmented-control.css', shadow: false, scoped: true })
export class HhSegmentedItem {
  @Prop() value = '';
  @Prop() disabled = false;
  /** Set by the parent <hh-segmented-control>. */
  @Prop({ reflect: true, mutable: true }) selected = false;
  @Event() hhSelect!: EventEmitter<string>;

  render() {
    return (
      <button
        type="button"
        role="radio"
        aria-checked={this.selected ? 'true' : 'false'}
        class={{ 'hh-segmented-item': true, 'is-selected': this.selected }}
        disabled={this.disabled}
        onClick={() => this.hhSelect.emit(this.value)}
      >
        <slot />
      </button>
    );
  }
}
