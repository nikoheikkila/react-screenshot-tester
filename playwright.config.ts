import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4173';

const config: PlaywrightTestConfig = {
    name: 'E2E Tests',
    fullyParallel: true,
    workers: '80%',
    projects: [
        {
            name: 'Desktop Chrome',
            use: {
                ...devices['Desktop Chrome'],
                browserName: 'chromium',
            },
        },
        {
            name: 'Desktop Firefox',
            use: {
                ...devices['Desktop Firefox'],
                browserName: 'firefox',
            },
        },
        {
            name: 'iPhone 14',
            use: {
                ...devices['iPhone 13'],
                browserName: 'webkit',
            },
        },
    ],
    webServer: {
        command: 'yarn preview',
        url: baseURL,
    },
    use: {
        actionTimeout: 5000,
        baseURL,
        acceptDownloads: true,
        headless: true,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
    },
};

export default config;
