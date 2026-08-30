
class LoginPage {

    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.emailField = page.locator("#userEmail");
        this.passwordField = page.locator("#userPassword");
    }
    async goToLoginPage() {
        await this.page.goto(process.env.BASE_URL_APP);
    }

    async validateLoginPage(username, password) {

        await this.emailField.fill("fijope2288@amupx.com");
        await this.passwordField.fill("Learning@830$3mK2");
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }

}
module.exports = { LoginPage };
