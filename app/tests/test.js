import { expect, test } from '@playwright/test';

test('basic test to ensure the program runs perfectly', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'The Story Pointing 🤦‍♂️' })).toBeVisible();
});

test('join a room', async ({ page }) => {
	await page.goto('/');
	await page.fill('input[placeholder="Your Name"]', 'Test User');
	await page.fill('input[placeholder="Room Name"]', 'Test Room');
	await page.click('button:has-text("Join Room")');
	await expect(page.getByText('Test Room')).toBeVisible();
	await expect(page.getByText('Test User')).toBeVisible();
});

test('update config', async ({ page }) => {
	await page.goto('/');
	await page.fill('input[placeholder="Your Name"]', 'Test User');
	await page.fill('input[placeholder="Room Name"]', 'Test Room');
	await page.click('button:has-text("Join Room")');
	await page.fill('input[name="pointingTime"]', '3');
	await page.click('button:has-text("Save")');
	await expect(page.getByText('3')).toBeVisible();
});

test('start a voting session', async ({ page }) => {
	await page.goto('/');
	await page.fill('input[placeholder="Your Name"]', 'Test User');
	await page.fill('input[placeholder="Room Name"]', 'Test Room');
	await page.click('button:has-text("Join")');
	await page.click('button:has-text("Start Voting Session")');
	await expect(page.getByText('Point the story in')).toBeVisible();
});

// TODO fix this
// test('submit a vote', async ({ page }) => {
//     await page.goto('/');
//     await page.fill('input[placeholder="Your Name"]', 'Test User');
//     await page.fill('input[placeholder="Room Name"]', 'Test Room');
//     await page.click('button:has-text("Join")');
//     await page.click('button:has-text("Start Voting Session")');
//     await page.waitForSelector('input[name="debt-amount"]');
//     await page.click('input[name="debt-amount"][value="5"]');
//     await expect(page.getByText('Leaderboard 😐')).toBeVisible();
// });
