//customer.ts // locators
// locators/customer.ts
 
export const CustomerLocators = {
  // Frames
  menuFrame: 'frame[name^="menu"]',
 
  // Menu
  userMenuBtn: { role: 'img', name: 'User Menu' },
  customerMenu: 'xpath=/html/body/div[3]/ul[1]/li/ul/li[2]/span/img',
  individualCustomer: 'xpath=/html/body/div[3]/ul[1]/li/ul/li[2]/ul/li[1]/a/img',
  authDeleteCustomer: 'xpath=/html/body/div[3]/ul[1]/li/ul/li[2]/ul/li[12]/a/img',
 
  // Create form
  sector: '//*[@id="fieldName:SECTOR"]',
  title: '//*[@id="fieldName:TITLE"]',
  givenName: '//*[@id="fieldName:GIVEN.NAMES"]',
  fullName: '//*[@id="fieldName:NAME.1:1"]',
  shortName: '//*[@id="fieldName:SHORT.NAME:1"]',
  accountOfficer: '//*[@id="fieldName:ACCOUNT.OFFICER"]',
  target: '//*[@id="fieldName:TARGET"]',
  industry: '//*[@id="fieldName:INDUSTRY"]',
  customerStatus: '//*[@id="fieldName:CUSTOMER.STATUS"]',
  nationality: '//*[@id="fieldName:NATIONALITY"]',
  residence: '//*[@id="fieldName:RESIDENCE"]',
  physicalAddress: '//*[@id="headtab"]/tbody/tr/td[2]/a',
  GBStreet: '//*[@id="fieldName:STREET:1"]',
 
  genderMale: 'xpath=/html/body/div[3]/div[2]/form[1]/div[4]/table/tbody/tr[3]/td/table[1]/tbody/tr[5]/td[3]/table/tbody/tr/td[2]/input',
  genderFemale: 'xpath=/html/body/div[3]/div[2]/form[1]/div[4]/table/tbody/tr[3]/td/table[1]/tbody/tr[5]/td[3]/table/tbody/tr/td[1]/input',
 
  mnemonic: '//*[@id="fieldName:MNEMONIC"]',
 
  commitBtn: '//*[@id="goButton"]/tbody/tr/td/table/tbody/tr/td/div/table/tbody/tr/td[1]/a/img',
 
  duplicateOverride: 'xpath=/html/body/div[3]/div[2]/form[1]/div[3]/table/tbody/tr[3]/td/table[1]/tbody/tr/td[1]/a',

  receivedDocMsg:'xpath=/html/body/div[3]/div[2]/form[1]/div[3]/table/tbody/tr[3]/td/table/tbody/tr/td[2]',
  receivedDocCheckbox:'xpath=/html/body/div[3]/div[2]/form[1]/div[3]/table/tbody/tr[3]/td/table/tbody/tr/td[3]/select',
  txnCompleteMsg: 'xpath=/html/body/div[3]/div[2]/form[1]/div[4]/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table[2]/tbody/tr/td',
 
  // Auth popup
  authorizeMsg:'//*[@id="enqheader"]/tbody/tr/td',
  authorizeBtn: 'xpath=/html/body/table/tbody/tr[2]/td/div[3]/div[2]/form[1]/div[2]/table/thead/tr[1]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/div/table/tbody/tr/td[5]/a/img'
};