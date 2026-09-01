
class LoginPage {

    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.emailField = page.locator("#userEmail");
        this.passwordField = page.locator("#userPassword");
    }
    async goToLoginPage() {
        await this.page.goto((process.env.BASE_URL_APP || '').trim());
    }

    async validateLoginPage(username, password) {
        const userName = username || process.env.TEST_EMAIL || "";
        const passWord = password || process.env.TEST_PASSWORD || process.env.TEST_PASSWORD_CLIENT_APP || "";

        await this.emailField.fill(userName);
        await this.passwordField.fill(passWord);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }

}
module.exports = { LoginPage };
