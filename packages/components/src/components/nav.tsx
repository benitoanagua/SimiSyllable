import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({ tag: 'hh-nav-item', styleUrl: 'nav.css', shadow: false })
export class HhNavItem {
  @Prop() href = '';
  @Prop() active = false;
  @Prop() disabled = false;
  @Event() hhNavigate!: EventEmitter<string>;
  render() {
    return this.href && !this.disabled
      ? <a class={{ nav: true, active: this.active }} href={this.href} aria-current={this.active ? 'page' : undefined} onClick={(e) => { this.hhNavigate.emit(this.href); }}>{<slot />}</a>
      : <button class={{ nav: true, active: this.active }} type="button" disabled={this.disabled} aria-current={this.active ? 'page' : undefined} onClick={() => this.hhNavigate.emit(this.href)}><slot /></button>;
  }
}

@Component({ tag: 'hh-nav', styleUrl: 'nav.css', shadow: false })
export class HhNav {
  @Prop() orientation: 'horizontal' | 'vertical' = 'vertical';
  render() { return <nav class={`nav-list is-${this.orientation}`}><slot /></nav>; }
}
