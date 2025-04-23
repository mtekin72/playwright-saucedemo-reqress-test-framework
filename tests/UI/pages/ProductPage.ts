
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
  private readonly sortDropdown: Locator;
  private readonly productNameList: Locator;
  private readonly productContainer: string = ".inventory_item";

  constructor(page: Page) {
    super(page);
    this.sortDropdown = this.page.locator(".product_sort_container");
    this.productNameList = this.page.locator(".inventory_item_name");
  }

  /**
   * Adds a product to the cart by name and returns its price
   */
  async addToCart(itemName: string): Promise<Record<string, string | null>> {
    const productLocator = this.page.locator(`${this.productContainer}:has-text("${itemName}")`);

    const price = await productLocator.locator(".inventory_item_price").textContent();
    await productLocator.locator("button").click();

    return {
      [itemName]: price,
    };
  }

  /**
   * Sort products using dropdown filter
   */
  async sortItemsBy(sortOrder: string): Promise<void> {
    await this.sortDropdown.selectOption({ value: sortOrder });
  }

  /**
   * Get list of all visible product names
   */
  async getAllProductNames(): Promise<string[]> {
    return await this.productNameList.allTextContents();
  }

  /**
   * (Optional) Validate you're on the right page
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
