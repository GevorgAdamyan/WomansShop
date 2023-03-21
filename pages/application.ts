import { Page } from "@playwright/test";
import LoginPage from "./loginPage";
import MainPage from "./mainPage";

export default class Application {
    protected page: Page;
    mainPage: MainPage;
    loginPage: LoginPage

    constructor(page: Page) {
        this.page = page;
        this.mainPage = new MainPage(page);
        this.loginPage = new LoginPage(page);
    }
}