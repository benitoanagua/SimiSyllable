import { Component, Element, Event, EventEmitter, Method, Prop, h } from '@stencil/core';

@Component({ tag: 'hh-dialog', styleUrl: 'dialog.css', shadow: false })
export class HhDialog {
  @Element() host!: HTMLElement;
  @Prop({ mutable: true }) open = false;
  @Prop() label = '';
  @Prop() closeOnEscape = true;
  @Event() hhOpen!: EventEmitter<void>;
  @Event() hhClose!: EventEmitter<void>;
  private dialog?: HTMLDialogElement;
  private previousFocus?: HTMLElement;

  @Method() async show() { this.open = true; }
  @Method() async close() { this.open = false; }

  componentDidRender() {
    if (!this.dialog) return;
    if (this.open && !this.dialog.open) {
      this.previousFocus = document.activeElement as HTMLElement;
      this.dialog.showModal();
      this.hhOpen.emit();
    } else if (!this.open && this.dialog.open) {
      this.dialog.close();
      this.previousFocus?.focus();
      this.hhClose.emit();
    }
  }

  private onCancel = (event: Event) => {
    if (!this.closeOnEscape) event.preventDefault();
    else { this.open = false; }
  };
  private onClose = () => { if (this.open) this.open = false; };

  render() {
    const titleId = `${this.host.id || 'hh-dialog'}-title`;
    return (
      <dialog ref={(el) => this.dialog = el as HTMLDialogElement} class="dialog" aria-labelledby={this.label ? titleId : undefined} onCancel={this.onCancel} onClose={this.onClose}>
        <div class="dialog-panel">
          <header class="dialog-header">
            {this.label ? <h2 id={titleId}>{this.label}</h2> : null}
            <button type="button" class="close" aria-label="Close" onClick={() => { this.open = false; }}><hh-icon name="x" /></button>
          </header>
          <div class="dialog-body"><slot /></div>
          <footer class="dialog-footer"><slot name="footer" /></footer>
        </div>
      </dialog>
    );
  }
}
