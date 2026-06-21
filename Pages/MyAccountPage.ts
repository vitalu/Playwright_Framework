import { Locator, Page } from "@playwright/test";

export class MyAccountPage {
  readonly page: Page;
  readonly userAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userAccountLink = page.getByRole("link", { name: "Playwright Test" });
  }

  async isAccountLinkVisible(): Promise<Boolean> {
    return await this.userAccountLink.isVisible();
  }
}
