import { test, expect } from "@playwright/test";

import {LoginPage,ProductPage,CheckoutPage,CartPage} from "@pages/index";

import {
  loginErrorMessage,
  products,
} from "@fixtures/productData";
import { validLogin,lockedUser,problemUser,performanceGlitchUser,errorUser, validOrderDetails } from "@fixtures/testData";
import {getNumbers} from '@helpers/ui'

test.describe("Login Functionality Test Suite", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
    });

    test("should login with standart user cridentials and  proper prouct images are shown on PLP when user logged in as standart user", async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.logIn(validLogin);
        const isStandardUser = await loginPage.isStandardUser();
      expect(isStandardUser).toBeTruthy();
    });

    test("should not login with locked User Cridentials and get proper error message for Locked User", async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.logIn(lockedUser );
      const errorMessage = await loginPage.getLoginLockedErrorMessage();
      expect(errorMessage?.trim()).toBe('Epic sadface: Sorry, this user has been locked out.');
    
  });
  test("Should Login with Problem User Cridentials and validate that Proper  Product Images are not shown", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.logIn(problemUser );
    const isStandardUser = await loginPage.isStandardUser();
    expect(isStandardUser).toBeFalsy();
  
});

test("Should Login with Performance Glitch User and validate delayed page load time", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const startTime = Date.now();
  await loginPage.logIn(performanceGlitchUser);
  await page.waitForSelector('.inventory_list');

  const endTime = Date.now();
  const loadTimeInSeconds = (endTime - startTime) / 1000;

  console.log(`⏱️ Page load time: ${loadTimeInSeconds} seconds`);

  // assert if delay happened more then 2 seconds,adjust the threshold as needed
  expect(loadTimeInSeconds).toBeGreaterThan(2);
});

test("Should Login with Error User and should not be able to finish checkout process", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cardPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  await loginPage.logIn(errorUser);
  await productPage.addToCart('Sauce Labs Backpack');
  await productPage.addToCart('Sauce Labs Bike Light');
  await cardPage.gotoCart();
  await cardPage.proceedToCheckout();
  await checkoutPage.inputOrderDetails(validOrderDetails);
  await checkoutPage.continueCheckout();
  await checkoutPage.completeOrder();
  
});

});