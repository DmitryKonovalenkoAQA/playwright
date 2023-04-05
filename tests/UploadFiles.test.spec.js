const {test, expect} = require('@playwright/test');
import path from 'path';

test("Upload file", async ({ page }) => {
    //Open url
    await page.goto("https://www.sendgb.com/");
    //file path
    const filePath = path.join(__dirname, '../screenshots/screenshot.jpg')
    //Upload file
    await page.setInputFiles('[name="qqfile"]',filePath)
    //Verify file name
    await expect(page.locator('.file-title')).toHaveText('screenshot.jpg');
  });