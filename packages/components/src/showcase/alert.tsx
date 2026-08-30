import { Component, Event, type EventEmitter, Prop, State, h } from '@stencil/core';

@Component({ tag: 'hh-alert', styleUrl: 'alert.css', shadow: false, scoped: true })
export class HhAlert {
  @State() visible = true;
  @Event() hhDismiss!: EventEmitter<void>;

  @Prop() tone: 'info' | 'success' | 'warning' | 'danger' = 'info';
  @Prop() heading = '';
  @Prop() dismissible = false;

  private dismiss = () => { this.visible = false; this.hhDismiss.emit(); };

  render() {
    if (!this.visible) return null;
    return (
      <section class={`hh-alert hh-alert--${this.tone}`} role={this.tone === 'danger' ? 'alert' : 'status'}>
        <div class="hh-alert__content">
          {this.heading ? <strong>{this.heading}</strong> : null}
          <div><slot /></div>
        </div>
        {this.dismissible ? <hh-icon-button name="x" label="Dismiss" size="small" onHhPress={this.dismiss} /> : null}
      </section>
    );
  }
}
