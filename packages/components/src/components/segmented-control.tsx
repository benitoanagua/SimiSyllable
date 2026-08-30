import { Component, Element, Event, type EventEmitter, Prop, h } from '@stencil/core';

/**
 *   <hh-segmented-control value="week" label="Range">
 *     <hh-segmented-item value="day">Day</hh-segmented-item>
 *     <hh-segmented-item value="week">Week</hh-segmented-item>
 *     <hh-segmented-item value="month">Month</hh-segmented-item>
 *   </hh-segmented-control>
 */
@Component({ tag: 'hh-segmented-control', styleUrl: 'segmented-control.css', shadow: false, scoped: true })
export class HhSegmentedControl {
  @Element() host!: HTMLElement;
  @Prop({ mutable: true }) value = '';
  @Prop() label = '';
  @Event() hhChange!: EventEmitter<string>;
  private list?: HTMLElement;

  componentDidLoad() {
    this.refresh();
    this.list?.addEventListener('hhSelect', this.onItemSelect as EventListener);
  }
  disconnectedCallback() {
    this.list?.removeEventListener('hhSelect', this.onItemSelect as EventListener);
  }

  private refresh = () => {
    const items = Array.from(this.host.querySelectorAll(':scope > hh-segmented-item')) as HTMLElement[];
    if (!this.value && items[0]) this.value = items[0].getAttribute('value') || '';
    this.syncChildren(items);
  };

  private syncChildren(items: HTMLElement[]) {
    items.forEach((item) => item.toggleAttribute('selected', item.getAttribute('value') === this.value));
  }

  private onItemSelect = (event: CustomEvent<string>) => {
    this.value = event.detail;
    this.syncChildren(Array.from(this.host.querySelectorAll(':scope > hh-segmented-item')) as HTMLElement[]);
    this.hhChange.emit(this.value);
  };

  render() {
    return (
      <div class="hh-segmented-control" role="radiogroup" aria-label={this.label || undefined} ref={(el) => (this.list = el as HTMLElement)}>
        <slot onSlotchange={this.refresh} />
      </div>
    );
  }
}
