import { test, expect } from '@playwright/test';

test('ログインできる', async ({ page }) => {
  await page.goto('/signIn');
  await page.getByLabel('email').fill('test999@gmail.com');
  await page.getByLabel('password').fill('testtest');
  await page.getByRole('button', { name: 'ログイン' }).click();
  await expect(page).toHaveURL('/');
});
