import { test, Page, expect } from "@playwright/test";
import Application from "../pages/application";
import { faker } from '@faker-js/faker';
import { data } from "../support/data"

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
    })

    test.beforeEach(async () => {
        await page.goto('/');
    })

    test.afterAll(async () => {
        await page.close();
    })

    test('should check login page elements visibility', async () => {
        await expect(page).toHaveTitle(data.titles.mainPage);
        await App.loginPage.checkPageElementsVisibility();
    })

    test('should successfully log in', async () => {
        await App.loginPage.signIn(email, password);
        await App.mainPage.checkPageElementsVisibility();
    })
})
