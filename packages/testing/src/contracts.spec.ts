import { test, expect } from '@playwright/test';

test.describe('HANDHELD public contracts', () => {
  test('button exposes a native button', async ({ page }) => {
    await page.setContent('<hh-button>Continue</hh-button>');
    const button = page.locator('hh-button button');
    await expect(button).toHaveRole('button', { name: 'Continue' });
  });
});
