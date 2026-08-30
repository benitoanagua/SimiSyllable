import { Component, Prop, h } from '@stencil/core';

export interface HhTableColumn { key: string; label: string; numeric?: boolean; }

@Component({ tag: 'hh-data-table', styleUrl: 'data-table.css', shadow: false, scoped: true })
export class HhDataTable {
  @Prop() columns: HhTableColumn[] = [];
  @Prop() rows: Record<string, string>[] = [];
  @Prop() caption = '';

  render() {
    return (
      <div class="hh-data-table" role="region" aria-label={this.caption || 'Data table'}>
        <table>
          {this.caption ? <caption>{this.caption}</caption> : null}
          <thead><tr>{this.columns.map(c => <th scope="col" class={c.numeric ? 'numeric' : ''}>{c.label}</th>)}</tr></thead>
          <tbody>
            {this.rows.map(row => <tr>{this.columns.map(c => <td class={c.numeric ? 'numeric' : ''}>{row[c.key]}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}
