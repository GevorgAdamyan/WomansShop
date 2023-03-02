import { Locator } from "@playwright/test";
import BasePage from "./basePage";

export default class CategoryPage extends BasePage {
    protected selectors = {
        itemContainer: '[data-test-id="features.product.productcard.product-list"]',
        item: '.sg-plp-image-container a[href="/en/products/draped-linen-dress-beige"]',
        categoryContainer: '.qom  ul li:nth-child(2) a > span:nth-child(2)',
        filterContainer: '.sg-filter-container',
        priceFilter: '[data-test-id="cy-price-facet-dropdown"]',
        sizeFilter: '[data-test-id="cy-size-facet-dropdown"]',
        colorFilter: '[data-test-id="cy-color-facet-dropdown"]',
        brandFilter: '[data-test-id="cy-brand-facet-dropdown"]',
        subCategoryContainer: '.sg-plp-sub-categories-container'
    };

    get categoryContainer(): Locator {
        return this.findElement(this.selectors.categoryContainer)
    }

    async checkPageElementsVisibility(): Promise<void> {
        let selectorsToExclude = ['item', 'itemContainer'];
        let selectorsToBeChecked = this.getSelectorsToBeChecked(this.selectors, selectorsToExclude);
        await this.getElemenstByArrayAndCheckVisibility(selectorsToBeChecked);
    }

    async selectAnItem(): Promise<void> {
        await this.clikOnElement(this.selectors.item)
    }
}
