import { APIRequestContext } from "@playwright/test";
import { Login, User } from "@helpers/types";

export async function getUsers(request: APIRequestContext) {
  const response = await request.get(`api/users`);
  return {
    status: response.status(),
    data: await response.json(),
  }; // Returns list from the response
}

// Helper function to update a user
export async function updateUser(
  request: APIRequestContext,
  userId: number,
  userData: User
) {
  const response = await request.put(`api/users/${userId}`, {
    data: userData,
  });

  return {
    status: response.status(),
    data: await response.json(),
  }; // Returns the updated user data from the response
}

export async function deleteUser(request: APIRequestContext, userId: number) {
  const response = await request.delete(`api/users/${userId}`);
  return {
    status: response.status(),
  }; // Returns the status code (e.g., 204 for no content)
}

export async function login(request: APIRequestContext, payload: Login) {
  const response = await request.post(`api/login`, {
    data: payload,
  });
  return {
    status: response.status(),
    data: await response.json(),
  };
}

export async function delayedRequest(request: APIRequestContext) {
  const response = await request.get(`api/users?delay=2.7`);
  return {
    status: response.status(),
    data: await response.json(),
  };
}

export async function getResource(request: APIRequestContext, id: number) {
  const response = await request.get(`api/unknown/${id}`);
  return {
    status: response.status(),
    data: await response.json(),
  };
}
