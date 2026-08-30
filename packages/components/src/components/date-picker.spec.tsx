import { newSpecPage } from '@stencil/core/testing';
import { HhDatePicker } from './date-picker';

describe('hh-date-picker', () => {
  it('accepts a typed ISO date and emits hhChange', async () => {
    const page = await newSpecPage({ components: [HhDatePicker], html: '<hh-date-picker></hh-date-picker>' });
    const spy = jest.fn();
    page.root?.addEventListener('hhChange', (e: Event) => spy((e as CustomEvent<string>).detail));
    const input = page.root?.querySelector('input') as HTMLInputElement;
    input.value = '2026-03-15';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledWith('2026-03-15');
  });

  it('disables a day button outside the min/max range', async () => {
    const page = await newSpecPage({
      components: [HhDatePicker],
      html: '<hh-date-picker value="2026-03-15" min="2026-03-10" max="2026-03-20"></hh-date-picker>',
    });
    const button = page.doc.createElement('button');
    // Find day "5" (before min) and day "25" (after max) among rendered day buttons.
    const dayButtons = Array.from(page.root?.querySelectorAll('.hh-date-picker__day') ?? []) as HTMLButtonElement[];
    const day5 = dayButtons.find((b) => b.textContent?.trim() === '5');
    const day25 = dayButtons.find((b) => b.textContent?.trim() === '25');
    expect(day5?.disabled).toBe(true);
    expect(day25?.disabled).toBe(true);
    void button;
  });

  it('does not select a disabled day', async () => {
    const page = await newSpecPage({
      components: [HhDatePicker],
      html: '<hh-date-picker value="2026-03-15" min="2026-03-10"></hh-date-picker>',
    });
    const instance = page.rootInstance as HhDatePicker;
    const before = instance.value;
    const dayButtons = Array.from(page.root?.querySelectorAll('.hh-date-picker__day') ?? []) as HTMLButtonElement[];
    const day5 = dayButtons.find((b) => b.textContent?.trim() === '5');
    day5?.click();
    await page.waitForChanges();
    expect(instance.value).toBe(before);
  });
});
