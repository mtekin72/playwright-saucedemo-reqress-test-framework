import { test, expect } from "@playwright/test";

import {
  CartPage,
  LoginPage,
  ProductPage,
} from "@pages/index";

import {
  loginErrorMessage,
  products,
} from "@fixtures/productData";
import { validLogin, validOrderDetails } from "@fixtures/testData";
import {getNumbers} from '@helpers/ui'

test.describe("Sauce demo", () => {
  test.describe("Product and Checkout", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      const loginPage = new LoginPage(page);
      await loginPage.logIn(validLogin);
    });

    test("should add product to cart and checkout", async ({ page }) => {
      const productPage = new ProductPage(page);
      const cartPage = new CartPage(page);

      const itemPrice = await test.step("Add items to cart", async () => {
        const itemOne = await productPage.addToCart(products[0]);
        const itemTwo = await productPage.addToCart(products[1]);
        const totalItems = { ...itemOne, ...itemTwo };
        const totalPrice = Object.values(totalItems).reduce(
          (acc, price) => acc + getNumbers(price),
          0
        );
        return totalPrice;
      });

      const checkout = await test.step("Proceed to checkout", async () => {
        await cartPage.gotoCart();
        return await cartPage.proceedToCheckout();
      });

      await test.step("Complete order", async () => {
        await checkout.inputOrderDetails(validOrderDetails);
        await checkout.continueCheckout();

        const orderSummary = await checkout.getOrderTotal();
        const price = getNumbers(orderSummary);
        await checkout.completeOrder();

        expect(price).toBe(itemPrice);
      });
    });

    test("should sort items by z-a and validate the storing is correct", async ({
      page,
    }) => {
      const productPage = new ProductPage(page);
      await productPage.sortItemsBy("za");

      const productNames = await productPage.getAllProductNames();

      const sortedProducts = [...productNames].sort().reverse();

      expect(productNames).toEqual(sortedProducts);

      expect(await productPage.getCurrentUrl()).toContain("inventory.html");
    });
  });

  test.describe("Login", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
    });
    test("should failed login with invalid credentials", async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.logIn({username: validLogin.username, password: "invalid"});
      const error = page.locator(".error-message-container");
      await error.locator('[data-test="error"]').waitFor({ state: "visible" });
      await expect(error).toHaveText(loginErrorMessage);
    });
  });
});
