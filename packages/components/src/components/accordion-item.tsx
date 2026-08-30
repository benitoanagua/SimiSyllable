import { Component, Element, Event, type EventEmitter, Prop, h } from '@stencil/core';

@Component({ tag: 'hh-accordion-item', styleUrl: 'accordion.css', shadow: false, scoped: true })
export class HhAccordionItem {
  @Element() host!: HTMLElement;
  @Prop({ mutable: true }) open = false;
  @Prop() value = '';
  @Prop() label = '';
  @Event({ bubbles: true, composed: true }) hhToggle!: EventEmitter<boolean>;
  private id = `hh-accordion-${Math.random().toString(36).slice(2)}`;
  render() {
    const panelId = `${this.id}-panel`;
    const buttonId = `${this.id}-button`;
    return <section class="item">
      <h3><button id={buttonId} type="button" class="trigger" aria-expanded={this.open ? 'true' : 'false'} aria-controls={panelId} onClick={() => { this.open = !this.open; this.hhToggle.emit(this.open); }}><span>{this.label}<slot name="label" /></span><hh-icon name={this.open ? 'chevron-up' : 'chevron-down'} /></button></h3>
      <div id={panelId} class="panel" role="region" aria-labelledby={buttonId} hidden={!this.open}><slot /></div>
    </section>;
  }
}
