import { Component, Element, Event, EventEmitter, Prop, State, h } from '@stencil/core';

@Component({ tag: 'hh-tabs', styleUrl: 'tabs.css', shadow: false })
export class HhTabs {
  @Element() host!: HTMLElement;
  @Prop({ mutable: true }) value = '';
  @Event() hhChange!: EventEmitter<string>;
  @State() private items: HTMLElement[] = [];

  componentDidLoad() { this.refresh(); }
  private refresh = () => {
    this.items = Array.from(this.host.querySelectorAll(':scope > hh-tab')) as HTMLElement[];
    if (!this.value && this.items[0]) this.value = this.items[0].getAttribute('value') || '';
    this.syncChildren();
  };
  private syncChildren = () => {
    this.items.forEach((tab) => tab.setAttribute('active', String(tab.getAttribute('value') === this.value)));
    Array.from(this.host.querySelectorAll(':scope > hh-tab-panel')).forEach((panel) => {
      const el = panel as HTMLElement;
      el.hidden = el.getAttribute('value') !== this.value;
    });
  };
  private onTabPress = (event: CustomEvent<string>) => {
    const next = event.detail;
    if (!next) return;
    this.value = next;
    this.syncChildren();
    this.hhChange.emit(this.value);
  };

  render() {
    return <div class="tabs"><div class="tab-list" role="tablist" aria-label="Tabs" onHhPress={this.onTabPress}><slot onSlotchange={this.refresh} /></div><slot name="panel" /></div>;
  }
}

@Component({ tag: 'hh-tab', styleUrl: 'tabs.css', shadow: false })
export class HhTab {
  @Element() host!: HTMLElement;
  @Prop() value!: string;
  @Prop() active = false;
  @Prop() disabled = false;
  @Event({ bubbles: true, composed: true }) hhPress!: EventEmitter<string>;
  private id = `hh-tab-${Math.random().toString(36).slice(2)}`;

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const tabs = Array.from(this.host.parentElement?.querySelectorAll(':scope > hh-tab') || []) as HTMLElement[];
    const enabled = tabs.filter((tab) => !tab.hasAttribute('disabled'));
    const current = enabled.indexOf(this.host);
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? enabled.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length;
    event.preventDefault();
    enabled[nextIndex]?.focus();
  };

  render() {
    const panelId = `${this.id}-panel`;
    return <button id={this.id} class={{ tab: true, active: this.active }} role="tab" aria-selected={this.active ? 'true' : 'false'} aria-controls={panelId} tabIndex={this.active ? 0 : -1} disabled={this.disabled} onClick={() => this.hhPress.emit(this.value)} onKeyDown={this.handleKeyDown}><slot /></button>;
  }
}

@Component({ tag: 'hh-tab-panel', styleUrl: 'tabs.css', shadow: false })
export class HhTabPanel {
  @Element() host!: HTMLElement;
  @Prop() value!: string;
  render() {
    const id = `${this.host.id || `hh-tab-panel-${this.value}`}`;
    return <section id={id} class="tab-panel" role="tabpanel" aria-labelledby={`hh-tab-${this.value}`} tabIndex={0}><slot /></section>;
  }
}
