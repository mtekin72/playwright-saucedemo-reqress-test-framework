import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";
import { CheckoutPage } from "./CheckoutPage";

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async gotoCart() {
    await this.page.locator("#shopping_cart_container").click();
  }

  /**
   * Initiate checkout process
   */
  async proceedToCheckout(): Promise<CheckoutPage> {
    await this.page.locator('[data-test="checkout"]').click();
    return new CheckoutPage(this.page);
  }
}
