const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pageObjects/LoginPage");

test.describe("Login page test cases", () => {
  const validEmail = "fijope2288@amupx.com";
  const validPassword = "Learning@830$3mK2";

  test("Positive: valid user login redirects to dashboard @Smoke", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step("Open login page and login with valid credentials", async () => {
      await loginPage.goToLoginPage();
      await loginPage.validateLoginPage(validEmail, validPassword);
    });

    await expect(page.getByRole("button", { name: /HOME/i })).toBeVisible();
    await expect(page).toHaveURL(/rahulshettyacademy\.com\/client\/#\/dashboard\//);
  });

  test("Negative: invalid password should stay on login page", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLoginPage();
    await loginPage.validateLoginPage(validEmail, "WrongPassword123");

    await expect(page.locator("[value='Login']")).toBeVisible();
    await expect(page).toHaveURL(/rahulshettyacademy\.com\/client\/#\/auth\/login$/);
  });

  test("Negative: invalid email should stay on login page", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLoginPage();
    await loginPage.validateLoginPage("invaliduser@example.com", validPassword);

    await expect(page.locator("[value='Login']")).toBeVisible();
    await expect(page).toHaveURL(/rahulshettyacademy\.com\/client\/#\/auth\/login$/);
  });

  test("Edge: empty email and password should keep user on login page", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLoginPage();
    await loginPage.validateLoginPage("", "");

    await expect(page.locator("[value='Login']")).toBeVisible();
    await expect(page).toHaveURL(/rahulshettyacademy\.com\/client\/#\/auth\/login$/);
  });

  test("Edge: invalid email format should stay on login page", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLoginPage();
    await loginPage.validateLoginPage("invalid-email-format", validPassword);

    await expect(page.locator("[value='Login']")).toBeVisible();
    await expect(page).toHaveURL(/rahulshettyacademy\.com\/client\/#\/auth\/login$/);
  });

  test("Edge: empty password with valid email should stay on login page", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLoginPage();
    await loginPage.validateLoginPage(validEmail, "");

    await expect(page.locator("[value='Login']")).toBeVisible();
    await expect(page).toHaveURL(/rahulshettyacademy\.com\/client\/#\/auth\/login$/);
  });
});
