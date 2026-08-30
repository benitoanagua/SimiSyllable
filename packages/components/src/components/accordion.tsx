import { Component, Element, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({ tag: 'hh-accordion', styleUrl: 'accordion.css', shadow: false })
export class HhAccordion {
  @Element() host!: HTMLElement;
  @Prop() multiple = false;
  @Event() hhChange!: EventEmitter<string[]>;
  private openItems: string[] = [];

  componentDidLoad() { this.refresh(); }
  private refresh = () => Array.from(this.host.querySelectorAll(':scope > hh-accordion-item')).forEach((item) => item.addEventListener('hhToggle', this.onToggle as EventListener));
  disconnectedCallback() { Array.from(this.host.querySelectorAll(':scope > hh-accordion-item')).forEach((item) => item.removeEventListener('hhToggle', this.onToggle as EventListener)); }
  private onToggle = (event: Event) => {
    const value = (event as CustomEvent<boolean>).detail;
    const item = event.target as HTMLElement;
    const key = item.getAttribute('value') || '';
    if (value) this.openItems = this.multiple ? [...new Set([...this.openItems, key])] : [key];
    else this.openItems = this.openItems.filter((v) => v !== key);
    this.hhChange.emit(this.openItems);
    this.sync();
  };
  private sync = () => Array.from(this.host.querySelectorAll(':scope > hh-accordion-item')).forEach((item) => item.setAttribute('open', String(this.openItems.includes(item.getAttribute('value') || ''))));
  render() { return <div class="accordion"><slot /></div>; }
}

@Component({ tag: 'hh-accordion-item', styleUrl: 'accordion.css', shadow: false })
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
