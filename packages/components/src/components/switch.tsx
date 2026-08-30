import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({ tag: 'hh-switch', styleUrl: 'choice.css', shadow: false })
export class HhSwitch {
  @Prop() label = '';
  @Prop({ mutable: true }) checked = false;
  @Prop() disabled = false;
  @Prop() name = '';
  @Event() hhChange!: EventEmitter<boolean>;
  render() { return <label class="choice"><input type="checkbox" role="switch" name={this.name || undefined} checked={this.checked} disabled={this.disabled} onChange={(event) => { this.checked = (event.target as HTMLInputElement).checked; this.hhChange.emit(this.checked); }} /><span>{this.label}<slot /></span></label>; }
}
