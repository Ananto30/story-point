import { expect, test } from '@playwright/test';

test('basic test to ensure the program runs perfectly', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'The Story Pointing 🤦‍♂️' })).toBeVisible();
});
