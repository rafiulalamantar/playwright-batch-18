const {test} = require ('@playwright/test');
const {expect} = require ('@playwright/test');

test('First Playwright test',async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(process.env.BASE_URL);
    console.log(await page.title());
    const userName= page.locator('#username');
    const password = page.locator ('#password');
    const signInButton = page.locator('#signInBtn');

    await userName.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');

    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption('consult');
    page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    await expect(page.locator('.radiotextsty').last()).toBeChecked();

    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    
    await page.locator('#terms').uncheck();
    expect (await page.locator("#terms").isChecked()).toBeFalsy();

    // await signInButton.click();
    await page.locator(".float-right").click();




});

test('Second Playwright test using Smart Locator', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button",{name: 'Submit'}).click();
    // await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    expect (page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();

    await page.getByRole("link",{name: "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
    
})

test('Child Windows', async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    await page.goto(process.env.BASE_URL);
    const documentsRequest = page.locator("[href*='documents-request']");

    const [childPage] = await Promise.all([
        context.waitForEvent('page'),
        documentsRequest.click()
    ]);

    const text = await childPage.locator(".red").textContent();
    console.log(text);
    const domainName = text.split("@")[1].split(" ")[0];
    console.log(domainName);

});

test ('More Validation', async({page})=>{

    await page.goto("https://google.com");
    await page.goBack();
    await page.goForward();
});

