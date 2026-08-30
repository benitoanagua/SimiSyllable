import { Component, Element, Event, type EventEmitter, Method, Prop, State, h } from '@stencil/core';

/**
 * A trigger + popover menu. The first slotted element (typically an
 * `<hh-button>` or `<hh-icon-button>` with `slot="trigger"`) opens the menu;
 * slotted `<hh-menu-item>` children make up the menu content.
 *
 *   <hh-menu label="Row actions">
 *     <hh-button slot="trigger">Actions</hh-button>
 *     <hh-menu-item value="edit">Edit</hh-menu-item>
 *     <hh-menu-item value="duplicate">Duplicate</hh-menu-item>
 *     <hh-menu-item value="delete" tone="danger">Delete</hh-menu-item>
 *   </hh-menu>
 */
@Component({ tag: 'hh-menu', styleUrl: 'menu.css', shadow: false, scoped: true })
export class HhMenu {
  @Element() host!: HTMLElement;
  @Prop({ mutable: true }) open = false;
  @Prop() label = '';
  @Prop() placement: 'bottom-start' | 'bottom-end' = 'bottom-start';
  @Event() hhOpenChange!: EventEmitter<boolean>;
  @Event() hhSelect!: EventEmitter<string>;

  @State() private items: HTMLElement[] = [];
  private root?: HTMLElement;
  private trigger?: HTMLElement;

  @Method() async show() { this.setOpen(true); }
  @Method() async close() { this.setOpen(false); }

  componentDidLoad() {
    this.refreshItems();
    document.addEventListener('click', this.onDocumentClick, true);
  }
  disconnectedCallback() {
    document.removeEventListener('click', this.onDocumentClick, true);
  }

  private refreshItems = () => {
    this.items = Array.from(this.host.querySelectorAll(':scope > hh-menu-item')) as HTMLElement[];
  };

  private setOpen(next: boolean) {
    if (this.open === next) return;
    this.open = next;
    this.hhOpenChange.emit(next);
    if (next) requestAnimationFrame(() => (this.items[0]?.querySelector('button') as HTMLElement | null)?.focus());
    else (this.trigger?.querySelector('button, a') as HTMLElement | null)?.focus();
  }

  private onTriggerClick = () => this.setOpen(!this.open);

  private onDocumentClick = (event: MouseEvent) => {
    if (!this.open) return;
    if (!this.root?.contains(event.target as Node)) this.setOpen(false);
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (!this.open) return;
    const buttons = this.items.map((item) => item.querySelector('button')).filter(Boolean) as HTMLButtonElement[];
    const currentIndex = buttons.findIndex((b) => b === document.activeElement);
    if (event.key === 'Escape') { event.preventDefault(); this.setOpen(false); return; }
    if (event.key === 'ArrowDown') { event.preventDefault(); buttons[(currentIndex + 1 + buttons.length) % buttons.length]?.focus(); return; }
    if (event.key === 'ArrowUp') { event.preventDefault(); buttons[(currentIndex - 1 + buttons.length) % buttons.length]?.focus(); return; }
    if (event.key === 'Home') { event.preventDefault(); buttons[0]?.focus(); return; }
    if (event.key === 'End') { event.preventDefault(); buttons[buttons.length - 1]?.focus(); return; }
  };

  private onItemSelect = (event: CustomEvent<string>) => {
    this.hhSelect.emit(event.detail);
    this.setOpen(false);
  };

  render() {
    const menuId = `${this.host.id || 'hh-menu'}-list`;
    return (
      <div class="hh-menu" ref={(el) => (this.root = el as HTMLElement)} onKeyDown={this.onKeyDown}>
        <span
          class="hh-menu__trigger"
          ref={(el) => (this.trigger = el as HTMLElement)}
          onClick={this.onTriggerClick}
        >
          <slot name="trigger" />
        </span>
        <div
          id={menuId}
          class={{ 'hh-menu__list': true, [`is-${this.placement}`]: true, 'is-open': this.open }}
          role="menu"
          aria-label={this.label || undefined}
          hidden={!this.open}
          onHhSelect={this.onItemSelect}
        >
          <slot onSlotchange={this.refreshItems} />
        </div>
      </div>
    );
  }
}
