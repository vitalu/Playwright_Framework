import { test, expect } from '@playwright/test';
let token: string;
const baseURL = 'http://64.227.160.186:9000/v1';
const username = 'iamfd';
const password = 'password';
test.beforeAll(async ({ request }) => {
const response = await request.post(`${baseURL}/login`, {
    data: {
      username: `${username}`,
      password: `${password}`,
    },
  });
    console.log("Token: ", await response.json());
    token = (await response.json()).data.token;

});
test('user details API test with token', async ({ request }) => {
  const response = await request.get(`${baseURL}/userdetails`, {
    headers: {
      Authorization: token,
    },
  });
  expect(response.status()).toBe(200);
  expect(await response.json()).toHaveProperty('message', 'Success');
  expect(await response.json()).toHaveProperty('data.login_id',`${username}`);

});
