import { Locator, Page } from "@playwright/test";
import BasePage from "./basePage";

export default class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
        this.page = page
    }

    protected selectors = {
        pageLogo: '.logo-wrapper > svg',
        emailField: 'input[name="email"]',
        passwordField: 'input[name="password"]',
        loginBtn: '#submit-login',
    };

    async checkPageElementsVisibility(): Promise<void> {
        let selectorsToBeChecked = this.getSelectorsToBeChecked(this.selectors);
        await this.getElemenstByArrayAndCheckVisibility(selectorsToBeChecked);
    }

    async signIn(email: string, password: string): Promise<void> {
        await this.typeText(this.selectors.emailField, email);
        await this.typeText(this.selectors.passwordField, password);
        await this.clikOnElement(this.selectors.loginBtn);
    }
}
