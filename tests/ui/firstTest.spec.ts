import {test,expect} from "@playwright/test";
import { getUserData } from '../../data/user.data';

test("First test", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Automation Practice");
  await page.getByRole("link", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Authentication" })).toBeVisible();
  await page.locator("#email").fill(getUserData().emailAddress);
  await page.locator("#passwd").fill(getUserData().password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("link", { name: "Playwright Test" })).toBeVisible();
  
});