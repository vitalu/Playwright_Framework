import { expect, test } from "@playwright/test";
import { createFakeCustomerData } from "../../data/customerInfo.data";

test("user registration test", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Automation Practice");
  await page.getByRole("link", { name: "Sign in" }).click();
  await expect(page).toHaveURL("login?back=my-account");
  await page
    .locator("#email_create")
    .fill(createFakeCustomerData().emailAddress);
  await page.getByRole("button", { name: "Create an account" }).click();
  await page.getByRole("radio", { name: "Mr." }).check();
  await page
    .getByRole("textbox", { name: "First name *" })
    .fill(createFakeCustomerData().firstName);
  await page
    .getByRole("textbox", { name: "Last name *" })
    .fill(createFakeCustomerData().lastName);
  await page
    .getByRole("textbox", { name: "Password *" })
    .fill(createFakeCustomerData().password);
  await page.locator("#days").selectOption(createFakeCustomerData().date);
  await page.locator("#months").selectOption(createFakeCustomerData().month);
  await page.locator("#years").selectOption(createFakeCustomerData().year);
  await page.getByRole("button", { name: "Register " }).click();
  await expect(page.getByText('Your account has been created.')).toBeVisible();
});
