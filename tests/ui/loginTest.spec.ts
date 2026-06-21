import {test,expect} from "@playwright/test";
import { getUserData } from '../../data/user.data';
import { LoginPage } from "../../Pages/LoginPage";

test("Should login with valid credentials", async ({ page }) => {
const userData = getUserData();
const loginPage = new LoginPage(page)
await loginPage.goTo()
const myAccountPage = await loginPage.doLogin(userData.emailAddress, userData.password)
await expect(myAccountPage.userAccountLink).toBeVisible();
});