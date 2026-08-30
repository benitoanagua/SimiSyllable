import { newSpecPage } from '@stencil/core/testing';
import { HhToastRegion } from './toast';

describe('hh-toast-region', () => {
  it('renders a shown toast', async () => {
    const page = await newSpecPage({ components: [HhToastRegion], html: '<hh-toast-region></hh-toast-region>' });
    const region = page.rootInstance as HhToastRegion;
    await region.show({ message: 'Saved.' });
    await page.waitForChanges();
    expect(page.root?.textContent).toContain('Saved.');
  });

  it('queues toasts beyond maxVisible and promotes on dismiss', async () => {
    const page = await newSpecPage({ components: [HhToastRegion], html: '<hh-toast-region max-visible="1"></hh-toast-region>' });
    const region = page.rootInstance as HhToastRegion;
    const firstId = await region.show({ message: 'First' });
    await region.show({ message: 'Second' });
    await page.waitForChanges();
    expect(page.root?.textContent).toContain('First');
    expect(page.root?.textContent).not.toContain('Second');

    await region.dismiss(firstId);
    await page.waitForChanges();
    expect(page.root?.textContent).toContain('Second');
  });
});
