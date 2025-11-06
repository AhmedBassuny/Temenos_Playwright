//customer_class
import { expect, Page } from "@playwright/test";
import fs from "fs";
import { CustomerLocators } from "../locators/customer";  // adjust path if needed
import { logging } from "../utils/logging_class";
 
export class Customer {
  readonly page: Page;
  data: any;
  filePath: any;
  frame: any;
  logUtil:logging;
  userName:string
 
  constructor(page: Page, data: any, filepath: any) {
    this.page = page;
    this.filePath = filepath;
    this.data = data;
    this.logUtil = new logging();
  }
 
  async openCustomerMenu() {
    await this.page.waitForSelector(CustomerLocators.menuFrame);
    this.frame = this.page.frames().find(f => f.name().startsWith("menu"));
    if (this.frame) {
      await this.frame.getByRole(CustomerLocators.userMenuBtn.role, { name: CustomerLocators.userMenuBtn.name }).click();
      await this.frame.locator(CustomerLocators.customerMenu).waitFor({ state: "visible" });
      await this.frame.locator(CustomerLocators.customerMenu).click();
    } else {
      throw new Error("Frame Not Found");
    }
  }
 
  async create(index: number, userName: string) {
    await this.frame.locator(CustomerLocators.individualCustomer).click();
    const popup = await this.page.waitForEvent("popup");
    await popup.waitForLoadState();
 
    await popup.locator(CustomerLocators.sector).fill(this.data[index].Sector);
    await popup.locator(CustomerLocators.title).selectOption(this.data[index].Title);
    await popup.locator(CustomerLocators.givenName).fill(this.data[index].Given_name);
    await popup.locator(CustomerLocators.givenName).fill(this.data[index].Given_name);
    await popup.locator(CustomerLocators.fullName).fill(this.data[index].Full_name);
    await popup.locator(CustomerLocators.shortName).fill(this.data[index].Short_name);
    await popup.locator(CustomerLocators.accountOfficer).fill(this.data[index].Account_officer);
    await popup.locator(CustomerLocators.target).fill(this.data[index].Target);
    await popup.locator(CustomerLocators.industry).fill(this.data[index].Industry);
    await popup.locator(CustomerLocators.customerStatus).fill(this.data[index].Customer_status);
    await popup.locator(CustomerLocators.nationality).fill(this.data[index].Nationality);
    await popup.locator(CustomerLocators.residence).fill(this.data[index].Residence);
    
 
    if (this.data[index].Gender === "Male") {
      await popup.locator(CustomerLocators.genderMale).click();
    } else {
      await popup.locator(CustomerLocators.genderFemale).click();
    }
 
    await popup.locator(CustomerLocators.mnemonic).fill(this.data[index].Mnemonic);
    await popup.screenshot({ path: `screenshots/create_customer_${this.data[index].Mnemonic}.png`, fullPage: true });
    await popup.locator(CustomerLocators.physicalAddress).click();
    await popup.locator(CustomerLocators.GBStreet).fill(this.data[index].GB_street);
    await popup.locator(CustomerLocators.commitBtn).click();
 
    if (await popup.locator(CustomerLocators.duplicateOverride).isVisible()) {
      await popup.locator(CustomerLocators.duplicateOverride).click();
    }
    if (await popup.locator(CustomerLocators.receivedDocMsg).isVisible()){
       await popup.locator(CustomerLocators.receivedDocCheckbox).selectOption("RECEIVED");
       await popup.locator(CustomerLocators.commitBtn).click();
    }
 
    if(await popup.locator(CustomerLocators.txnCompleteMsg).isVisible()){
      const text = await popup.locator(CustomerLocators.txnCompleteMsg).textContent();
 
    if (text) {
      const txn = text.match(new RegExp("Txn Complete:\\s*(\\d+)"));
      if (txn) {
      this.data[index].TXN_NUM = txn[1]; // Update the TXN_NUM for this customer
    }
    }
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
    this.logUtil.exportExcel(this.data, "user_data", userName, "dont know");
    this.logUtil.printCreateCutomer(userName,
                                  this.data[index].Title,
                                  this.data[index].Given_name,
                                  this.data[index].Gender,
                                  this.data[index].Mnemonic,
                                  this.data[index].Sector,
                                  this.data[index].TXN_NUM

    )
    
    await popup.screenshot({ path: `screenshots/create_customer_${this.data[index].TXN_NUM}.png`, fullPage: true });
    }else {
      throw new Error("Transaction Not Completed");
    }
    
    await popup.close();
  }
 
  async auth(txn_number: string, userName:string) {
    await this.frame.locator(CustomerLocators.authDeleteCustomer).click();
    const popup_Authorize = await this.page.waitForEvent("popup");
    await popup_Authorize.waitForLoadState();
    await popup_Authorize.locator(CustomerLocators.authorizeMsg).waitFor({state: 'visible'});
    if(await popup_Authorize.locator(`//table[1]//tr[td[1][normalize-space()="${txn_number}"]]/td[6]/a/img`).count() > 0 )
    {
      await popup_Authorize.locator(`//table[1]//tr[td[1][normalize-space()="${txn_number}"]]/td[6]/a/img`).click();
      await popup_Authorize.locator(CustomerLocators.authorizeBtn).waitFor({ state: "visible" });
      await popup_Authorize.screenshot({ path: `screenshots/authorize_customer_${txn_number}.png`, fullPage: true });
      await popup_Authorize.locator(CustomerLocators.authorizeBtn).click();
      this.logUtil.printAuthCutomer(userName, txn_number);
      await popup_Authorize.close();
    }else {
      throw new Error("TXN is Not Found");
    }
    
    await popup_Authorize.close();
  }
}