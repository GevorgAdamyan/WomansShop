import { Page } from "@playwright/test";
import CartPage from "./cartPage";
import CategoryPage from "./categoryPage";
import ItemPage from "./itemPage";
import MainPage from "./mainPage";

export default class Application {
    protected page: Page;
    mainPage: MainPage;
    categoryPage: CategoryPage;
    itemPage: ItemPage;
    cartPage: CartPage;

    constructor(page: Page) {
        this.page = page;
        this.mainPage = new MainPage(page);
        this.categoryPage = new CategoryPage(page);
        this.itemPage = new ItemPage(page);
        this.cartPage = new CartPage(page);
    }
}