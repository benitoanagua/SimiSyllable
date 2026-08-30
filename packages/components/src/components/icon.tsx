import { Component, Prop, h } from '@stencil/core';
import { resolveTablerIcon } from '@handheld/icons';

@Component({ tag: 'hh-icon', styleUrl: 'icon.css', shadow: false, scoped: true })
export class HhIcon {
  @Prop() name!: string;
  @Prop({ attribute: 'aria-label' }) ariaLabel?: string;

  render() {
    const nodes = resolveTablerIcon(this.name);
    const labelled = Boolean(this.ariaLabel);

    return (
      <svg
        class="hh-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        aria-hidden={labelled ? undefined : 'true'}
        aria-label={labelled ? this.ariaLabel : undefined}
        role={labelled ? 'img' : undefined}
      >
        {nodes?.map(([tag, attrs]) => h(tag, attrs))}
      </svg>
    );
  }
}
