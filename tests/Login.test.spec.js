const {test, expect} = require('@playwright/test');
import LoginPage from '../pages/LoginPage';

test('Login and grab firs item test', async({page})=>{;
    const card = page.locator(".card-body b").nth(0);
    const allCardsText = page.locator(".card-body b")
    const loginPage = new LoginPage(page)

    await loginPage.goTo()
    await loginPage.logIn("konovalenkodima@gmail.com","Test123$$")

    console.log(await card.textContent())
    await expect(card).toContainText("zara coat 3")

    //waitForLoadState - Waits for the required load state to be reached
    await page.waitForLoadState('domcontentloaded');
    const allContextAwait = allCardsText.allTextContents();
    console.log(await allContextAwait)
    await page.close();
})
