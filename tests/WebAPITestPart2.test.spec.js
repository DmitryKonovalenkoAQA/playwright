const { test, expect } = require("@playwright/test");
import POManager from "../pages/POManager";
const data = JSON.parse(
  JSON.stringify(require("../utils/placeholderTestData.json"))
);
let webContext;
let email = "konovalenkodima@gmail.com";

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const poManager = new POManager(page, expect);
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.logIn(data[0].login, data[0].password);
  await context.storageState({ path: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" });
});

test("e2e-test", async () => {
  const page = await webContext.newPage();
  const poManager = new POManager(page, expect);
  const loginPage = poManager.getLoginPage();
  const dashboardPage = poManager.getDashboardPage();
  const cartPage = poManager.getCartPage();
  const checkoutPage = poManager.getCheckoutPage();
  const successPage = poManager.getSuccessPage();
  const ordersPage = poManager.getOrdersPage();

  //Open home page
  await loginPage.goTo();
  //Add product to the cart
  await dashboardPage.searchProduct(data[0].productName);
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
  await checkoutPage.assertIsEmailsMatch(data[0].login);
  await checkoutPage.placeOrderButtonClick();

  // //Success page
  await successPage.assertCongratsMessage("Thankyou for the order.");
  const outputString = await successPage.getOrderNumber();
  await successPage.ordersLinkClick();
  await ordersPage.assertOrderPresentInTheOrderPage(outputString);
  await successPage.assertCheckOrderNumber(outputString);

  await page.close();
});
