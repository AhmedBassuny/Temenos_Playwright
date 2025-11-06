
import { test } from '@playwright/test';
import {Login} from '../Pages/login_class';
import {Customer} from '../Pages/customer_class';
import {Account} from '../Pages/account_class';
import path from 'path';
import fs from "fs";

//  Configuration 
const userName = ["INPUTT", "AUTHOR"]
const password = ["123456", "1234567"]
const url = "http://localhost:9091/R22MBR/servlet/BrowserServlet"

const filePath = path.resolve(__dirname, '../Test_data/test_data.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// test('Create & AUTH Customer', async({page})=>{
// const login_page = new Login(page);
// const customer = new Customer(page, data, filePath);
// await login_page.goto(url);
// await login_page.login(userName[0], password[0]);
// await login_page.assertLoginSuccess();
// await customer.openCustomerMenu();
// await customer.create(2,userName[0]);
// await login_page.signOff();
// await login_page.login(userName[1], password[1]);
// await customer.openCustomerMenu();
// await customer.auth(data[2].TXN_NUM, userName[1]);
// await login_page.signOff();
// });

// test.only('Negative authorize',async({page})=>{
//     const login_page = new Login(page);
//     const cutomer = new Customer(page, data, filePath, userName[1]);
//     await login_page.goto(url);
//     await login_page.login(userName[1], password[1]);
//     await cutomer.openCustomerMenu();
//     await cutomer.auth(11111);
//     await login_page.signOff();
// });

test('Create current account', async({page})=>{
const login_page = new Login(page);
const customer = new Customer(page, data, filePath,);
const account = new Account(page);
await login_page.goto(url);
await login_page.login(userName[0], password[0]);
await customer.openCustomerMenu();
await customer.create(4, userName[0]);
await login_page.signOff();
await login_page.login(userName[1], password[1]);
await customer.openCustomerMenu();
await customer.auth(data[4].TXN_NUM, userName[1]);
await account.openAccountMenu();
await account.currentAccount(data[4].TXN_NUM, data[4].Given_name, userName[1]);
});
// test('Create saving account', async({page})=>{
// const login_page = new Login(page);
// const customer = new Customer(page, data, filePath);
// const account = new Account(page);
// await login_page.goto(url);
// await login_page.login(userName[0], password[0]);
// await customer.openCustomerMenu();
// await customer.create(0, userName[0]);
// await login_page.signOff();
// await login_page.login(userName[1], password[1]);
// await customer.openCustomerMenu();
// await customer.auth(data[3].TXN_NUM, userName[1]);
// await account.openAccountMenu();
// await account.savingAccount(data[3].TXN_NUM, data[3].CURRENCY, data[3].Given_name, userName[1]);


// })
