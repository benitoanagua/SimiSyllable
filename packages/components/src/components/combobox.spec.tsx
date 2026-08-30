import { newSpecPage } from '@stencil/core/testing';
import { HhCombobox } from './combobox';
import { HhComboboxOption } from './combobox-option';

describe('hh-combobox', () => {
  it('filters options as the user types', async () => {
    const page = await newSpecPage({ components: [HhCombobox, HhComboboxOption] });
    const combobox = page.doc.createElement('hh-combobox') as HTMLElement & HhCombobox;
    combobox.name = 'country';
    page.body.appendChild(combobox);
    ['us', 'ca', 'mx'].forEach((value, i) => {
      const option = page.doc.createElement('hh-combobox-option');
      option.setAttribute('value', value);
      option.textContent = ['United States', 'Canada', 'Mexico'][i];
      combobox.appendChild(option);
    });
    await page.waitForChanges();

    const input = combobox.querySelector('input') as HTMLInputElement;
    input.value = 'can';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();

    const options = Array.from(combobox.querySelectorAll('hh-combobox-option'));
    const visible = options.filter((o) => o.hasAttribute('matched'));
    expect(visible.length).toBe(1);
    expect(visible[0].getAttribute('value')).toBe('ca');
  });

  it('emits hhChange when an option is selected', async () => {
    const page = await newSpecPage({ components: [HhCombobox, HhComboboxOption] });
    const combobox = page.doc.createElement('hh-combobox') as HTMLElement & HhCombobox;
    page.body.appendChild(combobox);
    const option = page.doc.createElement('hh-combobox-option');
    option.setAttribute('value', 'ca');
    option.textContent = 'Canada';
    combobox.appendChild(option);
    await page.waitForChanges();

    const spy = jest.fn();
    combobox.addEventListener('hhChange', (e: Event) => spy((e as CustomEvent<string>).detail));
    option.dispatchEvent(new CustomEvent('hhSelect', { detail: 'ca', bubbles: true }));
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledWith('ca');
    expect(combobox.value).toBe('ca');
  });
});
