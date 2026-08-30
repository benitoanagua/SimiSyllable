import { test, expect } from '@playwright/test';

test('HANDHELD Storybook is reachable', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).toContainText('HANDHELD');
});
