import { Component, Prop, h } from '@stencil/core';

@Component({ tag: 'hh-stack', styleUrl: 'hh-stack.css', shadow: false })
export class HhStack {
  @Prop() direction: 'row' | 'column' = 'column';
  @Prop() gap = 'var(--hh-space-4)';
  @Prop() align: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

  render() {
    return <div class="hh-stack" style={{ '--hh-stack-direction': this.direction, '--hh-stack-gap': this.gap, '--hh-stack-align': this.align }}><slot /></div>;
  }
}
