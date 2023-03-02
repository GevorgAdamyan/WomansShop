import { expect, Locator, Page } from "@playwright/test";

type SelectorObject = { [key: string]: string };

export default abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  protected abstract selectors: SelectorObject;

  abstract checkPageElementsVisibility(): Promise<void>;

  protected findElement(selector: string): Locator {
    return this.page.locator(selector)
  }

  protected async clikOnElement(selector: string, force?: boolean): Promise<void> {
    if (force) {
      await this.findElement(selector).click({ force: force })
    } else {
      await this.findElement(selector).click()
    }
  }

  protected async typeText(selector: string, text: string): Promise<void> {
    let field = this.findElement(selector);
    await field.click();
    await field.type(text);
  }


  protected async getElemenstByArrayAndCheckVisibility(selectors: string[]): Promise<void> {
    for (let i = 0; i < selectors.length; i++) {
      await expect(this.findElement(selectors[i])).toBeVisible();
    }
  }

  protected getSelectorsToBeChecked(selectors: SelectorObject, selectorsToExclude?: string | string[]): string[] {
    const selectorsToBeChecked: string[] = [];
    if (selectorsToExclude) {
      const excludeArray = Array.isArray(selectorsToExclude) ? selectorsToExclude : [selectorsToExclude];
      Object.keys(selectors).forEach(key => {
        if (!excludeArray.some(selector => selector === key)) {
          selectorsToBeChecked.push(selectors[key]);
        }
      });
    } else {
      Object.values(selectors).forEach(selector => selectorsToBeChecked.push(selector));
    }

    return selectorsToBeChecked;
  }
}
