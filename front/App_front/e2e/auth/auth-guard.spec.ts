import { test, expect } from '@playwright/test';
import { login } from '../helpers/login';

test('未ログイン時に保護されたページにアクセスするとログインページにリダイレクトされる', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page).toHaveURL('/signIn');
});
test('ログイン済みの場合、保護されたページにアクセスできる', async ({ page }) => {
  await login(page);
  await page.goto('/');
  await expect(page).toHaveURL('/');
});
test('認証済みの時、signInページにアクセスするとリダイレクトされる', async ({ page }) => {
  await login(page);
  await page.goto('/signIn');
  await expect(page).toHaveURL('/');
});
