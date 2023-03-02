import { test, Page, expect } from "@playwright/test";
import Application from "../pages/application";
import { faker } from '@faker-js/faker';
import { data } from "../support/data"
import Utils from "../support/utils";

let App: Application;
let page: Page;
let email: string;
let password: string;

test.describe('Test Landing page', () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        email = faker.internet.email();
        password = faker.internet.password();
        App = new Application(page);
        await page.goto('/');
        await App.mainPage.acceptCookies();
    })

    test.beforeEach(async () => {
        await page.goto('/');
    })

    test.afterAll(async () => {
        await page.close();
    })

    test('should check landing page elements visibility', async () => {
        await expect(page).toHaveTitle(data.titles.mainPage);
        await App.mainPage.checkPageElementsVisibility();
    })

    test('it should successfully registrate a new user', async () => {
        await App.mainPage.openMyAccount();
        await App.mainPage.openSignUpForm();
        await App.mainPage.registrateNewUser(email, password);
        await expect(App.mainPage.successMessage).toBeVisible();
        await page.waitForTimeout(4000);
        await App.mainPage.signOut(false);
    })

    test('should successfully log in', async () => {
        await App.mainPage.openMyAccount();
        await App.mainPage.openSignInForm();
        await App.mainPage.signIn(email, password);
        await expect(App.mainPage.successMessage).toBeVisible();
        await page.waitForTimeout(4000);
        await App.mainPage.openMyAccount();
        let currentUsername = await App.mainPage.usernameContainer.innerText();
        await expect(currentUsername).toContain(Utils.getUsername(email));
        await App.mainPage.signOut(true);
    })
})
