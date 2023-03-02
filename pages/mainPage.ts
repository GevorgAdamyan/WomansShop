import { Locator, Page } from "@playwright/test";
import BasePage from "./basePage";

export default class MainPage extends BasePage {
    constructor(page: Page) {
        super(page);
        this.page = page
    }

    protected selectors = {
        pageLogo: '.logo-wrapper > svg',
        searchBar: 'input[data-test-id="quick-search"]',
        followers: '//span[text()="3.2M Followers"]',
        localBtn: '.sg-header-localization',
        accountBtn: '.sg-header-my-pages-button',
        latestViewIcon: '[id="Icon/eye"]',
        likedBtn: '.sg-header-like-button',
        cartBtn: '[data-test-id="features.sitelayout.header.cart"]',
        headerMenu: '.sg-header-menu-container',
        footerColumns: 'div.footer-sustainability-columns',
        paymentMethods: '[data-test-id="features.footer.paymentMethods"]',
        signUpBtn: '.sg-header-my-pages-button > div:nth-child(3) button:nth-child(1)',
        signInBtn: '.sg-header-my-pages-button > div:nth-child(3) button:nth-child(2)',
        signUp_signIn_Form: '//div[text()="Login or create an account"]',
        emailField: 'input[name="email"]',
        passwordField: 'input[name="password"]',
        confirmPasswordField: 'input[name="confirmPassword"]',
        loginBtn: '#submit-login',
        signUpConfirmBtn: '//button/span[text()="Sign up"]',
        successMessage: '//*[text()="You successfully signed in"]',
        acceptCookiesBtn: '[data-testid="uc-accept-all-button"]',
        usernameContainer: '.sg-header-my-pages-button> div:nth-child(3) span',
        signOutBtn: '.sg-header-my-pages-button> div:nth-child(3) button',
        browseProductsTab: '[data-test-id="features.sitelayout.header.desktopheader.browseProducts"]',
        newArivalsTab: '.sg-header-menu-container a[href="/en/latest-arrivals"]',
        mostWantedTab: '.sg-header-menu-container a[href="/en/topsellers"]',
        giftCardsTab: '.sg-header-menu-container a[href="/en/brands/na-kd-gift-card"]',
        specialPricesTab: '.sg-header-menu-container a[href="/en/campaigns/2023/special-prices"]',
        influencersTab: '.sg-header-menu-container a[href="/en/influencercollections"]',
        preLovedTab: '.sg-header-menu-container a[href="/en/pre-loved"]',
        saleTab: '.sg-header-menu-container a[href="/en/sale"]',
        navigationPopUp: 'nav.qf3',
        addedItemsNumber: '[data-test-id="features.sitelayout.header.cart"] span:nth-child(1)'
    };

    private get signUp_SignIn_Form(): Locator {
        return this.findElement(this.selectors.signUp_signIn_Form)
    }

    private get acceptCookiesBtn(): Locator {
        return this.findElement(this.selectors.acceptCookiesBtn)
    }

    get successMessage(): Locator {
        return this.findElement(this.selectors.successMessage)
    }

    get usernameContainer(): Locator {
        return this.findElement(this.selectors.usernameContainer)
    }

    get addedItemNumber(): Locator {
        return this.findElement(this.selectors.addedItemsNumber)
    }

    async acceptCookies(): Promise<void> {
        try {
            await this.page.waitForTimeout(1000);
            await this.clikOnElement(this.selectors.acceptCookiesBtn)
        } catch (error) {
            console.log("Cookies accepted");
        }
    }

    async checkPageElementsVisibility(): Promise<void> {
        let selectorsToExclude = ['signUpBtn', 'signInBtn', 'emailField', 'passwordField', 'confirmPasswordField',
            'loginBtn', 'signUpConfirmBtn', 'signUp_signIn_Form', 'successMessage', 'acceptCookiesBtn',
            'cookiesContainer', 'usernameContainer', 'signOutBtn', 'navigationPopUp', 'addedItemsNumber'
        ]
        let selectorsToBeChecked = this.getSelectorsToBeChecked(this.selectors, selectorsToExclude);
        await this.getElemenstByArrayAndCheckVisibility(selectorsToBeChecked);
    }

    async openMyAccount(): Promise<void> {
        await this.clikOnElement(this.selectors.accountBtn)
    }

    async openSignUpForm(): Promise<void> {
        await this.clikOnElement(this.selectors.signUpBtn);
        await this.signUp_SignIn_Form.waitFor();
    }

    async openSignInForm(): Promise<void> {
        await this.clikOnElement(this.selectors.signInBtn);
        await this.signUp_SignIn_Form.waitFor();
    }

    async registrateNewUser(email: string, password: string): Promise<void> {
        await this.typeText(this.selectors.emailField, email);
        await this.typeText(this.selectors.passwordField, password);
        await this.typeText(this.selectors.confirmPasswordField, password);
        await this.clikOnElement(this.selectors.signUpConfirmBtn);
    }

    async signIn(email: string, password: string): Promise<void> {
        await this.typeText(this.selectors.emailField, email);
        await this.typeText(this.selectors.passwordField, password);
        await this.clikOnElement(this.selectors.loginBtn);
    }

    async openBrowseProductsTab(): Promise<void> {
        await this.findElement(this.selectors.browseProductsTab).hover();
        await this.findElement(this.selectors.navigationPopUp).waitFor();
    }

    async navigateToProductCategory(categoryLink: string): Promise<void> {
        await this.openBrowseProductsTab();
        await this.clikOnElement(`${this.selectors.navigationPopUp} a[${categoryLink}]`);
        await this.page.waitForResponse('https://www.na-kd.com/en/category/**');
    }

    async openCart(): Promise<void> {
        await this.clikOnElement(this.selectors.cartBtn)
    }

    async signOut(isAcountTabOpened: boolean): Promise<void> {
        if (isAcountTabOpened) {
            await this.clikOnElement(this.selectors.signOutBtn);
        } else {
            await this.openMyAccount();
            await this.clikOnElement(this.selectors.signOutBtn);
        }
        await this.page.waitForResponse('**/doLogout');
        await this.page.waitForTimeout(1000);
    }

    async goToMain(): Promise<void> {
        await this.clikOnElement(this.selectors.pageLogo, true)
    }
}
