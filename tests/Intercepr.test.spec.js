const { test, expect } = require("@playwright/test");
import POManager from "../pages/POManager";
const data = JSON.parse(JSON.stringify(require('../utils/placeholderTestData.json')))

test("Intercept", async ({ page }) => {
  const fakeBody = [
    {
      id: 1,
      title: "Haben oder haben",
      author: "Fric Eromm",
      genre: "philosophy",
      price: "9.95",
      rating: "★★★★☆",
      stock: "1",
    },
  ];

  await page.route(
    "https://danube-webshop.herokuapp.com/api/books",
    (route) => {
      route.fulfill({
        body: JSON.stringify(fakeBody),
      });
    }
  );
  await page.goto("https://danube-webshop.herokuapp.com/");
});


test("block requests for pictures", async ({ page }) => {
  const poManager = new POManager(page, expect);
  const loginPage = poManager.getLoginPage();

  await page.route("**/*.{jpg,jpeg,png}", (route) => {
    // for blocking more type of file you can use {}, example .{jpeg, jpg}
    route.abort();
  });
  await loginPage.goTo()
  await loginPage.logIn(data[0].login, data[0].password)
});
