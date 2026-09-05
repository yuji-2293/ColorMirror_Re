import { test, expect } from '@playwright/test';
import { login } from '../helpers/login';

test('ログアウトできる', async ({ page }) => {
  await login(page);
  await page.getByRole('button', { name: 'ログアウト' }).click();
  await expect(page).toHaveURL('/signIn');
});
