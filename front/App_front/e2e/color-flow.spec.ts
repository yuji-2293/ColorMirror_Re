import { test, expect } from '@playwright/test';
import { login } from './helpers/login';

test('主要機能のフローが正常に動作する', async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL('/');
  // Colorの生成テスト
  await page.getByRole('button', { name: 'ワクワク' }).click();
  await page.getByRole('button', { name: '生成開始', exact: true }).click();
  await expect(page.getByRole('button', { name: '再生成', exact: true })).toBeVisible();
  // Colorを選択して、コメント生成テスト
  const colorButtonSelect = page.getByRole('button', {
    name: /を選択/,
  });
  await colorButtonSelect.first().click();
});
