import { Locator } from "@playwright/test";
import BasePage from "./basePage";

export default class ItemPage extends BasePage{
    protected selectors = {
        itemsImagesContainer: '[data-test-id="features.product.variation-container"]',
        sizeSelector: '.sg-variation-info [data-testid="features.product.size.dropdown"] button',
        sizeOptions: '[data-test-id="features.product.size.options"]',
        sizeOption: '[data-test-id="features.product.size.option"]',
        addToCartBtn: '[data-test-id="features.product.product-add-to-cart.button"]',
        descriptionTab: '[data-id="details-description"]',
        materialsAndOriginTab: '[data-id="materials-origin"]',
        deliveryAndReturnTab: '[data-id="shipping-returns"]',
        cartPopUp: '//*[text()="Added to cart"]'
    };

    private get sizeOptions(): Locator {
        return this.findElement(this.selectors.sizeOptions)
    }

    get cartPopUp(): Locator {
        return this.findElement(this.selectors.cartPopUp)
    }

    async checkPageElementsVisibility(): Promise<void> {
        let selectorsToExclude = ['sizeOptions', 'sizeOption', 'cartPopUp'];
        let selectorsToBeChecked = this.getSelectorsToBeChecked(this.selectors, selectorsToExclude);
        await this.getElemenstByArrayAndCheckVisibility(selectorsToBeChecked);
    }

    private async openSizeSelector(): Promise<void> {
        await this.clikOnElement(this.selectors.sizeSelector);
        await this.sizeOptions.waitFor();
    }

    async selectSize(index: number): Promise<void> {
        await this.openSizeSelector();
        await this.clikOnElement(`${this.selectors.sizeOption}:nth-child(${index})`);
    }

    async addToCart(): Promise<void> {
        await this.clikOnElement(this.selectors.addToCartBtn)
    }
}
