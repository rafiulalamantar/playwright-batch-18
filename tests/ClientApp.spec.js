const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pageObjects/LoginPage");
const { POManager } = require("../pageObjects/POManager");
const { OrdersHistoryPage } = require("../pageObjects/OrdersHistoryPage");
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

test("Verify that order creation succesfully @Smoke", async ({ page }) => {
  const productName = "ZARA COAT 3";

  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill("fijope2288@amupx.com");
  await page.getByPlaceholder("enter your passsword").fill("Learning@830$3mK2");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").last().waitFor();

  await page
    .locator(".card-body")
    .filter({ hasText: "ZARA COAT 3" })
    .getByRole("button", { name: "Add to Cart" })
    .click();

  await page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" })
    .click();

  //await page.pause();
  await page.locator("div li").first().waitFor();
  await expect(page.getByText("ZARA COAT 3")).toBeVisible();

  await page.getByRole("button", { name: "Checkout" }).click();

  await page.getByPlaceholder("Select Country").pressSequentially("ind");

  await page.getByRole("button", { name: "India" }).nth(1).click();
  await page.getByText("PLACE ORDER").click();

  await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});

for (const data of dataset) {
  test(`Verify that order creation succesfully using pageobject model ${data.productsNames}`, async ({ page }) => {
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goToLoginPage();
    await loginPage.validateLoginPage(data.TEST_EMAIL, data.TEST_PASSWORD_CLIENT_APP);

    const dashboard = poManager.getDashboardPage();
    await dashboard.searchProductAndAddToCart(data.productsNames);
    await dashboard.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productsNames);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    await dashboard.navigateToOrders();

    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  });
}

//   const poManager = new POManager(page);

//   const loginPage = poManager.getLoginPage();
//   await loginPage.goToLoginPage();
//   await loginPage.validateLoginPage("", "");
//   const dashboard = poManager.getDashboardPage();
//   // await dashboard.searchProductAndAddToCart("data.productsNames");
//   await dashboard.searchProductAndAddToCart("ZARA COAT 3");
//   await dashboard.navigateToCart();

//   const cartPage = poManager.getCartPage();
//   // await cartPage.VerifyProductIsDisplayed(data.productsNames);
//   await cartPage.VerifyProductIsDisplayed("ZARA COAT 3");
//   await cartPage.Checkout();

//   const ordersReviewPage = poManager.getOrdersReviewPage();
//   await ordersReviewPage.searchCountryAndSelect("ind", "India");
//   const orderId = await ordersReviewPage.SubmitAndGetOrderId();
//   console.log(orderId);
//   await dashboard.navigateToOrders();
//   const ordersHistoryPage = poManager.getOrdersHistoryPage();
//   await ordersHistoryPage.searchOrderAndSelect(orderId);
//   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
// });
