const {test} = require ('@playwright/test');
const {expect} = require ('@playwright/test');

test.only('First Playwright test',async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
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

    await signInButton.click();
    await page.pause();



});

test('Second Playwright test', async ({page})=>{

    await page.goto('https://playwright.dev/docs/test-fixtures');
    await page.pause();
    
})