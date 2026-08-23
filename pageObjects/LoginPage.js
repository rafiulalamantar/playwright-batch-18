class LoginPage{

    constructor(page){
        this.page = page;
        this.emailField= page.locator("#userEmail");
        this.passwordField= page.locator("#userPassword");
        this.signInButton=page.locator("[value='Login']");

    }

    async goToLoginPage(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validateLoginPage(username,password){
        await this.emailField.fill("fijope2288@amupx.com");
        await this.passwordField.fill("Learning@830$3mK2");
        await this.signInButton.click();

    }
}

module.exports = {LoginPage}