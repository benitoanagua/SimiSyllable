import { Component, Event, type EventEmitter, Prop, h } from '@stencil/core';

@Component({ tag: 'hh-combobox-option', styleUrl: 'combobox.css', shadow: false, scoped: true })
export class HhComboboxOption {
  @Prop() value = '';
  /** All three are set by the parent <hh-combobox> — presence-based (toggleAttribute), not string values. */
  @Prop({ reflect: true, mutable: true }) matched = true;
  @Prop({ reflect: true, mutable: true }) active = false;
  @Prop({ reflect: true, mutable: true }) selected = false;
  @Event() hhSelect!: EventEmitter<string>;

  render() {
    return (
      <div
        role="option"
        aria-selected={this.selected ? 'true' : 'false'}
        class={{ 'hh-combobox__option': true, 'is-active': this.active }}
        onMouseDown={(event) => { event.preventDefault(); this.hhSelect.emit(this.value); }}
      >
        <slot />
      </div>
    );
  }
}
