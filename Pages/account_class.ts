import { Page, expect } from "@playwright/test";
import { AccountLocators } from "../locators/account";
import { logging } from "../utils/logging_class";
 
export class Account {
  readonly page: Page;
  frame: any;
  logUtil: logging;
 
  constructor(page: Page) {
    this.page = page;
    this.logUtil = new logging();
  }
 
  async openAccountMenu() {
    await this.page.waitForSelector(AccountLocators.menuFrame);
    this.frame = this.page.frames().find(f => f.name().startsWith("menu"));
    if (!this.frame) throw new Error("Frame Not Found");
 
    if (!(await this.frame.locator(AccountLocators.accountMenu).isVisible())) {
      await this.frame
        .getByRole(AccountLocators.userMenuBtn.role, { name: AccountLocators.userMenuBtn.name })
        .click();
    }
  }
 
  async currentAccount(txn_num: string , name:string, userName:string) {
    await this.frame.locator(AccountLocators.accountMenu).click();
    await this.frame.locator(AccountLocators.currentAccountMenu).click();
 
    const popup = await this.page.waitForEvent("popup");
    await popup.waitForLoadState();
 
    //  Get all txn numbers in the dropdown
 
    // If authorized → continue
    await popup.locator(AccountLocators.currentAccountTxnInput).fill(txn_num);
    await popup.locator(AccountLocators.fieldNameCurrentAccount).waitFor({state: "visible"});
    expect(await popup.locator(AccountLocators.fieldNameCurrentAccount)).toHaveText(name);
    await popup.screenshot({ path: `screenshots/current_account_${txn_num}.png`, fullPage: true });
    await popup.locator(AccountLocators.commitBtnCurrent).click();
    this.logUtil.printCurrentAccount(userName, txn_num);
   
  }
 
  async savingAccount(txn_num: string, currency: string, name:string, userName:string) {
    await this.frame.locator(AccountLocators.accountMenu).click();
    await this.frame.locator(AccountLocators.savingAccountMenu).click();
 
    const popup = await this.page.waitForEvent("popup");
    await popup.waitForLoadState();
 
    // If authorized continue
    await popup.locator(AccountLocators.savingAccountTxnInput).fill(txn_num);
    await popup.locator(AccountLocators.fieldNameSavingAccount).waitFor({state: "visible"});
    expect(await popup.locator(AccountLocators.fieldNameSavingAccount)).toHaveText(name);
    await popup.locator(AccountLocators.savingAccountCurrencyInput).fill(currency);
    await popup.screenshot({ path: `screenshots/saving_account_${txn_num}.png`, fullPage: true });
    await popup.locator(AccountLocators.commitBtnSaving).click();
   this.logUtil.printSavingAccount(userName, txn_num);
  }
}