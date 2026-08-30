import { Component, Prop, h } from '@stencil/core';

@Component({ tag: 'hh-skeleton', styleUrl: 'skeleton.css', shadow: false, scoped: true })
export class HhSkeleton {
  @Prop() variant: 'text' | 'circle' | 'rect' = 'text';
  @Prop() width?: string;
  @Prop() height?: string;

  render() {
    const style: Record<string, string> = {};
    if (this.width) style.width = this.width;
    if (this.height) style.height = this.height;
    return (
      <span
        class={{ 'hh-skeleton': true, [`is-${this.variant}`]: true }}
        style={style}
        role="status"
        aria-label="Loading"
      />
    );
  }
}
