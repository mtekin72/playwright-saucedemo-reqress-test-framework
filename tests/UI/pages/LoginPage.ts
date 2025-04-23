import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private usernameField: Locator;
  private passwordField: Locator;
  private loginButton: Locator;
  private inventoryItemImage:Locator;
  private lockedUserErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameField = this.page.locator("#user-name");
    this.passwordField = this.page.locator("#password");
    this.loginButton = this.page.locator("#login-button");
    this.inventoryItemImage = this.page.locator(".inventory_item_img a img");
    this.lockedUserErrorMessage= this.page.locator('h3');

  }

  async logIn({ username, password = "" }: { username: string; password?: string }) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  // You can also add additional methods to verify successful login or error handling
  async getLoginLockedErrorMessage(): Promise<string | null> {
    return await this.lockedUserErrorMessage.textContent();
  }


  async isStandardUser(): Promise<boolean> {
    const count = await this.inventoryItemImage.count();
  
    if (count === 0) {
      return false; // No images loaded at all
    }
  
    for (let i = 0; i < count; i++) {
      const src = await this.inventoryItemImage.nth(i).getAttribute('src');
      if (src === '/static/media/sl-404.168b1cce.jpg') {
        return false; // Found a broken image → this is a problem user
      }
    }
  
    return true; // No broken images → this is a standard user
  }
  

} 
 
