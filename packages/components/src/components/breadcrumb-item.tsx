import { Component, Prop, h } from '@stencil/core';

@Component({ tag: 'hh-breadcrumb-item', styleUrl: 'breadcrumbs.css', shadow: false, scoped: true })
export class HhBreadcrumbItem {
  @Prop() href = '';
  /** Set automatically by the parent <hh-breadcrumbs> on the last item. */
  @Prop({ reflect: true, mutable: true }) current = false;

  render() {
    return (
      <li class="hh-breadcrumbs__item">
        {this.current || !this.href ? (
          <span aria-current={this.current ? 'page' : undefined}><slot /></span>
        ) : (
          <a href={this.href}><slot /></a>
        )}
        {!this.current ? <hh-icon name="chevron-right" class="hh-breadcrumbs__sep" aria-hidden="true" /> : null}
      </li>
    );
  }
}
