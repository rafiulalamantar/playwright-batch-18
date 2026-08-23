
const {test,expect} = require('@playwright/test');


test.only('Verify that order creation succesfully',async({page})=>{


    const productName = 'ZARA COAT 3';

    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder('email@example.com').fill("fijope2288@amupx.com");
    await page.getByPlaceholder('enter your passsword').fill("Learning@830$3mK2");
    await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").last().waitFor();
   
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();
 
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
   //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 
   await page.getByRole("button",{name :"Checkout"}).click();
 
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();

   await expect(page.getByText("Thankyou for the order.")).toBeVisible();

})