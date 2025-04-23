import { test, expect } from "@playwright/test";
import {
  updateUser,
  deleteUser,
  getUsers,
  login,
  delayedRequest,
  getResource,
} from "@helpers/api"; // Adjust the import path accordingly
import { validAPILogin, apiUserDataRetrieve } from "@fixtures/testData";

test.describe("API Tests", () => {
  test.describe("Positive API Tests", () => {
    test("should return list of users", async ({ request }) => {
      const { status, data: users } = await getUsers(request);
      expect(status).toBe(200);
      expect(users).toBeDefined();
      expect(users.data[1].first_name).toEqual(apiUserDataRetrieve.first_name);
      expect(users.data[1].last_name).toEqual(apiUserDataRetrieve.last_name);
      expect(users.data[1].email).toEqual(apiUserDataRetrieve.email);
    });

    test("should successful login", async ({ request }) => {
      const { status, data: user } = await login(request, validAPILogin);
      expect(status).toBe(200);
      expect(user).toBeDefined();
    });

    test("should successfully update the user", async ({ request }) => {
      const { status, data: user } = await updateUser(request, 2, {
        name: "John Doe",
        job: "QA Engineer",
      });
      expect(status).toBe(200);
      expect(user).toBeDefined();
      expect(user.name).toEqual("John Doe");
      expect(user.job).toEqual("QA Engineer");
    });

    test("should successfully delete the user", async ({ request }) => {
      const { status } = await deleteUser(request, 2);
      expect(status).toBe(204);
    });

    test("should perform successfully delayed request", async ({ request }) => {
      const startTime = Date.now();
      const { status } = await delayedRequest(request);
      const responseTime = Date.now() - startTime;

      /**
       * The delay is set at 2.7 seconds and response time should be less than or equal to 3 seconds
       */
      expect(responseTime).toBeLessThanOrEqual(3000);
      expect(status).toBe(200);
    });
  });

  test.describe("Negative API Tests", () => {
    test("should return 400 for login", async ({ request }) => {
      const email = validAPILogin.email;
      const { status, data: user } = await login(request, {
        email,
      });
      expect(status).toBe(400);
      expect(user).toEqual({ error: "Missing password" });
    });
    test("should return 404 for resource not found", async ({ request }) => {
      const { status } = await getResource(request, 23);
      expect(status).toBe(404);
    });
  });
});
