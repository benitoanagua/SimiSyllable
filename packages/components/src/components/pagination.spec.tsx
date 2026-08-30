import { newSpecPage } from '@stencil/core/testing';
import { HhPagination } from './pagination';

describe('hh-pagination', () => {
  it('shows all pages when the total fits without collapsing', async () => {
    const page = await newSpecPage({ components: [HhPagination], html: '<hh-pagination page="1" page-count="5"></hh-pagination>' });
    const buttons = page.root?.querySelectorAll('.hh-pagination__page');
    expect(buttons?.length).toBe(5);
  });

  it('collapses distant pages behind an ellipsis', async () => {
    const page = await newSpecPage({ components: [HhPagination], html: '<hh-pagination page="10" page-count="20"></hh-pagination>' });
    const ellipses = page.root?.querySelectorAll('.hh-pagination__ellipsis');
    expect(ellipses?.length).toBeGreaterThan(0);
    const current = page.root?.querySelector('[aria-current="page"]');
    expect(current?.textContent?.trim()).toBe('10');
  });

  it('emits hhChange with the clamped next page', async () => {
    const page = await newSpecPage({ components: [HhPagination], html: '<hh-pagination page="1" page-count="3"></hh-pagination>' });
    const spy = jest.fn();
    page.root?.addEventListener('hhChange', (event: Event) => spy((event as CustomEvent<number>).detail));
    const next = page.root?.querySelectorAll('.hh-pagination__page')[1] as HTMLButtonElement;
    next.click();
    expect(spy).toHaveBeenCalledWith(2);
  });
});
