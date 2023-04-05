const { test, expect } = require("@playwright/test");

test('Create screenshot', async ({ page }) => {
    await page.goto('https://www.slamdunk.ru/')
    // await page.waitForLoadState('networkidle')
    await page.locator('.slick-prev.slick-arrow').waitFor()
    await page.screenshot({path: "screenshots/screenshot.jpg"})
});

//A snapshot is created on the first run.
//When you rerun the test, the snapshot is compared with the new snapshot
test('@web Checking screenshot', async ({ page }) => {
    await page.goto('https://www.slamdunk.ru/')
    await page.locator('.slick-prev.slick-arrow').waitFor()
    expect(await page.screenshot()).toMatchSnapshot({path: "screenshots/screenshot.jpg"})
});