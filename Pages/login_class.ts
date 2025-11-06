import { Page, expect } from "@playwright/test"
import {loginLocators} from "../locators/login"
import { logging } from "../utils/logging_class";
export class Login {
    readonly page: Page;
    logUtil: logging;
    username:string
    password:string

    constructor(page:Page){
        this.page = page;
        this.logUtil = new logging();

    }

    async goto(url:string){
        await this.page.goto(url);
    }

    async login(Username: string, Password:string){
        this.username = Username;
        this.password = Password;
        await expect(this.page.locator(loginLocators.logo)).toBeVisible();
        await expect(this.page.locator(loginLocators.title)).toHaveText("Transact Sign in");
        await this.page.locator(loginLocators.signOnName).fill(this.username);
        await this.page.locator(loginLocators.password).fill(this.password);
        await this.page.screenshot({ path: `screenshots/logging.png`, fullPage: true })
        await this.page.locator(loginLocators.signInButton).click();
        this.logUtil.printLoggingInfo(this.username);
    }

    async assertLoginSuccess(){
        await this.page.waitForSelector('frame[name^="menu"]');
        const frame = this.page.frames().find(f => f.name().startsWith(loginLocators.frame));
        if (frame){
            await expect(frame.getByText("Last signed on")).toBeVisible();
        }else {
            throw new Error("Frame Not Found");
        }
    }

    async signOff(){
        await this.page.waitForSelector('frame[name^="banner"]');
        const frame = this.page.frames().find(f => f.name().startsWith(loginLocators.frame));
        if (frame){
            await frame.locator(loginLocators.signOffButton).click();
            await expect(this.page.locator(loginLocators.logo)).toBeVisible();
        }else {
            throw new Error("Frame Not Found");
        }
        this.logUtil.printSignOff(this.username);
    }
}