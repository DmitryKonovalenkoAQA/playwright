const { test, expect } = require("@playwright/test");
import POManager from "../pages/POManager";
const data = JSON.parse(JSON.stringify(require('../utils/placeholderTestData.json')))

for (const testData of data) {
  test(`e2e-test with adding product ${testData.productName}`, async ({ page }) => {
    const productName = "adidas original";
    // Initialization poManager
    const poManager = new POManager(page, expect);
    // Initialization pages
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckoutPage();
    const successPage = poManager.getSuccessPage();
    const ordersPage = poManager.getOrdersPage();

    //Login to the account
    await loginPage.goTo();
    await loginPage.logIn(testData.login, testData.password);

    //Add product to the cart
    await dashboardPage.searchProduct(testData.productName);
    await dashboardPage.navigateToCart();

    //Checking product in the cart page
    await cartPage.waitLoadingCartPage();
    cartPage.assertAddedProductInTheCartPage();
    await cartPage.checkoutButtonClick();

    //Checkout page
    await checkoutPage.enterCoupon("rahulshettyacademy");
    await checkoutPage.assertAppliedCoupon();
    await checkoutPage.enterCVV("666");
    await checkoutPage.choseCountry("Uk", "Ukraine");
    await checkoutPage.assertIsEmailsMatch(testData.login);
    await checkoutPage.placeOrderButtonClick();

    // //Success page
    await successPage.assertCongratsMessage("Thankyou for the order.");
    const outputString = await successPage.getOrderNumber();
    await successPage.ordersLinkClick();
    await ordersPage.assertOrderPresentInTheOrderPage(outputString);
    await successPage.assertCheckOrderNumber(outputString);

    await page.close();
  });
}