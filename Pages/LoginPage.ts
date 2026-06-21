import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly signInLink: Locator;
  readonly emailAddressInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInLink = page.getByRole("link", { name: "Sign in" });
    this.emailAddressInput = page.locator("#email");
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.signInButton = page.getByRole("button", { name: "Sign in" });
  }

  async goTo() {
    await this.page.goto("/");
  }
  async doLogin(emailAddress: string, password: string) {
    await this.signInLink.click();
    await this.emailAddressInput.fill(emailAddress);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
