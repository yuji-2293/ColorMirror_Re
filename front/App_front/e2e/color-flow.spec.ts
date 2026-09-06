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
  await page.getByRole('button', { name: 'AI生成開始', exact: true }).click();
  await expect(page.getByRole('button', { name: 'AIコメント再生成', exact: true })).toBeVisible();

  // 保存したデータが一覧に表示されるかテスト
  const responsePromise = page.waitForResponse(
    (response) => response.url().includes('/responses') && response.request().method() === 'POST'
  );
  await page.getByRole('button', { name: '保存する', exact: true }).click();
  await expect(page.getByRole('button', { name: '保存する', exact: true })).toBeDisabled();
  const response = await responsePromise;
  const request = response.request();
  const params = request.postDataJSON();
  await expect(page.getByText(params.color.mood, { exact: true })).toBeVisible();
  await expect(page.getByText(params.response.ai_response)).toBeVisible();
  console.log(params);
});
