import { test, Page, expect } from "@playwright/test";
import Application from "../pages/application";
import { faker } from '@faker-js/faker';
import { data } from "../support/data"
import Utils from "../support/utils";

let App: Application;
let page: Page;
let url: string;
let itemPrice: number;
let shippingFee: number;
let totalPrice: number;

test.describe('Test Products', () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        App = new Application(page);
        await page.goto('/');
        await App.mainPage.acceptCookies();
    })

    test.beforeEach(async () => {
        await page.goto('/');
        await App.mainPage.openMyAccount();
        await App.mainPage.openSignInForm();
        await App.mainPage.signIn(data.credentials.correctTestEmail, data.credentials.correctPassword);
        await page.waitForTimeout(4000);
    })

    test.afterEach(async () => {
        await page.waitForTimeout(1500);
        await App.mainPage.signOut(false);
    })

    test.afterAll(async () => {
        await page.close();
    })

    test('should navigate to dresses category and check page', async () => {
        await App.mainPage.navigateToProductCategory(data.categoryLinks.dresses);
        url = page.url();
        await expect(url).toContain(data.paths.dressesPage);
        await expect(page).toHaveTitle(data.titles.dressesPage);
        await App.categoryPage.checkPageElementsVisibility();
        await expect(App.categoryPage.categoryContainer).toHaveText(data.categoryNames.dresses);
    })

    test('should navigate to dress page and add it to cart', async () => {
        await App.mainPage.navigateToProductCategory(data.categoryLinks.dresses);
        await App.categoryPage.selectAnItem();
        url = page.url();
        await expect(url).toContain(data.paths.productsPage);
        await App.itemPage.checkPageElementsVisibility();
        await App.itemPage.selectSize(data.sizes.eu32);
        await App.itemPage.addToCart();
        await expect(App.itemPage.cartPopUp).toBeVisible();
        await App.mainPage.goToMain();
        await expect(App.mainPage.addedItemNumber).toHaveText('1');
    })

    test('should navigate to cart page, check the page and remove the items from cart', async () => {
        await App.mainPage.openCart();
        await App.cartPage.checkPageElementsVisibility();
        itemPrice = await App.cartPage.getItemPrice();
        shippingFee = await App.cartPage.getShipmentPrice();
        totalPrice = await App.cartPage.getTotalPrice();
        await expect(totalPrice * 100).toEqual(itemPrice * 100 + shippingFee * 100);
        App.cartPage.removeItems();
        await expect(App.cartPage.recoveryWrapper).toBeVisible();
        await expect(await App.cartPage.emptyCartMessage()).toHaveText(data.emptyCartMessage);
    })
})
