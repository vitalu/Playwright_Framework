import {test,expect} from "@playwright/test";
import { getUserData } from '../../data/user.data';
import { LoginPage } from "../../Pages/LoginPage";

test("Should login with valid credentials", async ({ page }) => {
const userData = getUserData();
const login = new LoginPage(page)
await login.goTo()
await login.doLogin(userData.emailAddress, userData.password)
await expect(page.getByRole("link", { name: "Playwright Test" })).toBeVisible();
});