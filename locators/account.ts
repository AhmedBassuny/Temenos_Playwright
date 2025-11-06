// locators/account.ts
 
export const AccountLocators = {
  // Frame
  menuFrame: 'frame[name^="menu"]',
 
  // Menu
  userMenuBtn: { role: 'img', name: 'User Menu' },
  accountMenu: 'xpath=/html/body/div[3]/ul[1]/li/ul/li[4]/span',
  currentAccountMenu: 'xpath=/html/body/div[3]/ul[1]/li/ul/li[4]/ul/li[1]/a',
  savingAccountMenu: 'xpath=/html/body/div[3]/ul[1]/li/ul/li[4]/ul/li[2]/a',
 
  // Current Account Popup
  currentAccountTxnInput: '//*[@id="fieldName:CUSTOMER"]',
  commitBtnCurrent: '//*[@id="goButton"]/tbody/tr/td/table/tbody/tr/td/div/table/tbody/tr/td[1]/a/img',
  fieldNameCurrentAccount: '//*[@id="enri_CUSTOMER"]',
 
  // Saving Account Popup
  savingAccountTxnInput: '//*[@id="fieldName:CUSTOMER"]',
  savingAccountCurrencyInput: '//*[@id="fieldName:CURRENCY"]',
  fieldNameSavingAccount: '//*[@id="enri_CUSTOMER"]',
  commitBtnSaving: '//*[@id="goButton"]/tbody/tr/td/table/tbody/tr/td/div/table/tbody/tr/td[1]/a/img',
};