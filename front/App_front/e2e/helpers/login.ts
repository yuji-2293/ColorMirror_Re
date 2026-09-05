import { Page, expect } from '@playwright/test';

export const login = async (page: Page) => {
  await page.goto('/signIn');
  await page.getByLabel('email').fill('test999@gmail.com');
  await page.getByLabel('password').fill('testtest');
  await page.getByRole('button', { name: 'ログイン' }).click();
  await expect(page).toHaveURL('/');
};
