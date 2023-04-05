const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require('..//utils/ApiUtils').default

const  loginPayload = {
  userEmail: "konovalenkodima@gmail.com",
  userPassword: "Test123$$",
};

const orderPayload = {
  orders: [{ country: "Ukraine", productOrderedId: "6262e9d9e26b7e1a10e89c04" }],
};

let response

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext,loginPayload)
  response = await apiUtils.createOrder(orderPayload)


});  

test("Login and grab firs item test", async ({ page }) => {
  
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  
  const card = page.locator(".card-body").nth(0);
  const card1 = page.locator(".card-body b");
  await page.goto("https://rahulshettyacademy.com/client/");
  await expect(card).toContainText("zara coat 3");
  const awaitAllContext = await card1.allTextContents();
  console.log(awaitAllContext);
  page.close();
});

test("Check order in the page", async ({ page }) => {

  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://www.rahulshettyacademy.com/client/");
  await page.locator('[routerlink="/dashboard/myorders"]').click();

  await page.locator("tbody").waitFor();
  const rows = page.locator("tbody tr");
  const tableCount = await rows.count();
  
  for (let i = 0; i < tableCount; ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();   

    //Checking that the orderId includes rowOrderId
    if (response.orderId.includes(rowOrderId)) {
      await page.locator("table tbody button.btn-primary").nth(i).click();
      break;
    }
  }
  const result = await page.locator(".col-text").textContent();
  expect(response.orderId.includes(result)).toBeTruthy();
  page.close();
});