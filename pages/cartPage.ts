import { Locator } from "@playwright/test";
import Utils from "../support/utils";
import BasePage from "./basePage";

export default class CartPage extends BasePage {
    protected selectors = {
        cartContent: '[data-test-id="features.sitelayout.fullcart.base"] > div > div:nth-child(1)',
        paymentInfo: '[data-test-id="features.sitelayout.fullcart.base"] > div > div:nth-child(2)',
        itemPriceBox: '[data-testid="features.sitelayout.fullcart.item"] .sg-price',
        shipmentPriceBox: '[data-testid="features.sitelayout.minicart.rows.shippingfee"] .sg-price',
        totalPriceBox: '[data-testid="features.sitelayout.minicart.rows.topay"] .sg-price',
        removItemBtn: '[data-test-id="features.sitelayout.minicart.removebutton"]',
        recoverWrapper: '[data-test-id="recover.wrapper"]',
        emptyCartMessage: '[data-test-id="features.sitelayout.fullcart.base"] h2',
        browseBtn: '[data-test-id="features.sitelayout.fullcart.base"] a'
    }

    get recoveryWrapper(): Locator {
        return this.findElement(this.selectors.recoverWrapper)
    }

    private get browseBtn(): Locator {
        return this.findElement(this.selectors.browseBtn)
    }

    async emptyCartMessage(): Promise<Locator> {
        await this.browseBtn.waitFor();
        return this.findElement(this.selectors.emptyCartMessage)
    }

    async checkPageElementsVisibility(): Promise<void> {
        let selectorsToExclude = ['browseBtn', 'emptyCartMessage', 'recoverWrapper'];
        let selectorsToBeChecked = this.getSelectorsToBeChecked(this.selectors, selectorsToExclude);
        await this.getElemenstByArrayAndCheckVisibility(selectorsToBeChecked);
    }

    private async getPrice(selector: string): Promise<number> {
        let priceAsString = await this.findElement(selector).innerText();        
        return Utils.getPrice(priceAsString);
    }

    async getItemPrice(): Promise<number> {
        return this.getPrice(this.selectors.itemPriceBox)
    }

    async getShipmentPrice(): Promise<number> {
        return this.getPrice(this.selectors.shipmentPriceBox)
    }

    async getTotalPrice(): Promise<number> {
        return this.getPrice(this.selectors.totalPriceBox)
    }

    async removeItems(): Promise<void> {
        await this.clikOnElement(this.selectors.removItemBtn);
    }
}
