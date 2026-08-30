import { newSpecPage } from '@stencil/core/testing';
import { HhButton } from './button';

describe('hh-button', () => {
  it('renders its content', async () => {
    const page = await newSpecPage({ components: [HhButton], html: '<hh-button>Continue</hh-button>' });
    expect(page.root?.textContent).toContain('Continue');
  });
});
