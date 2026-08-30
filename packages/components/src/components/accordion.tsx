import { Component, Element, Event, type EventEmitter, Prop, h } from '@stencil/core';

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

