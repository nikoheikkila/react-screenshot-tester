import type { Download, Locator, Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

test.describe('Screenshot tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test.describe('Save to Disk button', () => {
        let button: Locator;
        let formatDropdown: Locator;

        test.beforeEach(async ({ page }) => {
            button = page.getByRole('button', { name: 'Save to Disk' });
            formatDropdown = page.getByLabel('Format');
        });

        test('downloads PNG image by default', async ({ page }) => {
            const download = await saveToDisk(page);

            expect(download.suggestedFilename()).toMatch(/capture-(.+)\.png/);
        });

        test('downloads JPEG image', async ({ page }) => {
            await formatDropdown.selectOption({ label: 'JPEG' });

            const download = await saveToDisk(page);

            expect(download.suggestedFilename()).toMatch(/capture-(.+)\.jpeg/);
        });

        test('downloads WebP image', async ({ page }) => {
            await formatDropdown.selectOption({ label: 'WebP' });

            const download = await saveToDisk(page);

            expect(download.suggestedFilename()).toMatch(/capture-(.+)\.webp/);
        });

        const saveToDisk = async (page: Page): Promise<Download> => {
            const [download] = await Promise.all([page.waitForEvent('download'), button.click()]);

            return download;
        };
    });

    test.describe('Context Menu', () => {
        let main: Locator;
        let contextMenu: Locator;

        test.beforeEach(async ({ page }) => {
            main = page.getByRole('main');
            contextMenu = page.locator('.context-menu');
        });

        test('is visible on right-click', async ({ page }) => {
            await main.click({ button: 'right' });

            await expect(contextMenu).toBeVisible();
        });

        test('displays supported image formats', async ({ page }) => {
            await main.click({ button: 'right' });

            await expect(contextMenu).toContainText('PNG');
            await expect(contextMenu).toContainText('JPEG');
            await expect(contextMenu).toContainText('WebP');
        });

        test('downloads a PNG image', async ({ page }) => {
            await main.click({ button: 'right' });

            const download = await clickContextMenuItem(page, 'PNG');

            expect(download.suggestedFilename()).toMatch(/capture-(.+)\.png/);
        });

        test('downloads a JPEG image', async ({ page }) => {
            await main.click({ button: 'right' });

            const download = await clickContextMenuItem(page, 'JPEG');

            expect(download.suggestedFilename()).toMatch(/capture-(.+)\.jpeg/);
        });

        test('downloads a WebP image', async ({ page }) => {
            await main.click({ button: 'right' });

            const download = await clickContextMenuItem(page, 'WEBP');

            expect(download.suggestedFilename()).toMatch(/capture-(.+)\.webp/);
        });

        const clickContextMenuItem = async (page: Page, format: string): Promise<Download> => {
            const [download] = await Promise.all([
                page.waitForEvent('download'),
                contextMenu.getByText(format).click(),
            ]);

            return download;
        };
    });
});
