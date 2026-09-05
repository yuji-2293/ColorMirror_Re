import { test, expect } from '@playwright/test';

test('トップページが表示される', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('ColorMirror_Re')).toBeVisible();
});

test('ログインページが表示される', async ({ page }) => {
  await page.goto('/signIn');
  await expect(page.getByRole('button', { name: 'ログイン' })).toBeVisible();
});

test('サインアップページが表示される', async ({ page }) => {
  await page.goto('/signUp');
  await expect(page.getByRole('button', { name: 'アカウント作成' })).toBeVisible();
});
