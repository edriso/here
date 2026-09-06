import { expect, test } from '@playwright/test';

test('do a Special Time session, save a moment, and keep it across a reload', async ({ page }) => {
  await page.goto('/');

  // The seed suggests the most overdue child. Start with them.
  await page.getByRole('button', { name: 'Start with Noah' }).first().click();

  // Prep, then start the timer.
  await expect(page.getByRole('heading', { name: /Five minutes with Noah/ })).toBeVisible();
  await page.getByRole('button', { name: /Start 5 minutes/ }).click();

  // End it right away; even a moment counts.
  await page.getByRole('button', { name: /We.re done/ }).click();
  await expect(page.getByRole('heading', { name: 'You showed up.' })).toBeVisible();

  // Catch a keepsake moment.
  await page.getByLabel('A moment to keep').fill('He taught me his dinosaur game.');
  await page.getByRole('button', { name: 'Save this moment' }).click();

  // It appears in Moments, and survives a reload (local persistence).
  await page.getByRole('link', { name: 'Moments' }).click();
  await expect(page.getByText('He taught me his dinosaur game.')).toBeVisible();

  await page.reload();
  await page.getByRole('link', { name: 'Moments' }).click();
  await expect(page.getByText('He taught me his dinosaur game.')).toBeVisible();
});

test('add a child and see them on Today', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Children' }).click();
  await page.getByLabel('Name').fill('Ada');
  await page.getByRole('button', { name: /Add Ada/ }).click();
  await page.keyboard.press('Escape');

  await expect(page.getByRole('dialog', { name: 'Your children' })).toBeHidden();
  await expect(page.getByRole('main').getByText('Ada', { exact: true })).toBeVisible();
});
