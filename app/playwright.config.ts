import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'node ../server/index.mjs',
		port: 3000
	},
	testDir: 'tests',
	testMatch: /.*\.js/
};

export default config;
