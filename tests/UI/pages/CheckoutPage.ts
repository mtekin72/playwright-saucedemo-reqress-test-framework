import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  private firstNameField: Locator;
  private lastNameField: Locator;
  private postalCodeField: Locator;
  private continueButton: Locator;
  private finishButton: Locator;
  private subtotalLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameField = this.page.locator("#first-name");
    this.lastNameField = this.page.locator("#last-name");
    this.postalCodeField = this.page.locator("#postal-code");
    this.continueButton = this.page.locator("#continue");
    this.finishButton = this.page.locator('[data-test="finish"]');
    this.subtotalLabel = this.page.locator('[data-test="subtotal-label"]');
  }

  async inputOrderDetails(orderDetails: {
    firstName: string;
    lastName: string;
    postalCode: string;
  }) {
    await this.firstNameField.fill(orderDetails.firstName);
    await this.lastNameField.fill(orderDetails.lastName);
    await this.postalCodeField.fill(orderDetails.postalCode);
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async getOrderTotal(): Promise<string | null> {
    return await this.subtotalLabel.textContent();
  }

  async completeOrder() {
    await this.finishButton.click();
  }
}

