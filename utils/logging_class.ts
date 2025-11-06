import * as XLSX from "xlsx";
import * as fs from 'fs';
export class logging{

    /**
     * 
     * @param userName 
     */
    printLoggingInfo(userName: string){
        console.log(`user: ${userName} has logged in `);
    }

    /**
     * 
     * @param userName 
     */
    printSignOff(userName: string){
        console.log(`user: ${userName} has signed off `);
    }
    /**
     * 
     * @param userName:string
     * @param title:string 
     * @param name:string
     * @param gender:string
     * @param mnemonic:string 
     * @param Sector:string
     * @param txn_num:string
     */
    printCreateCutomer(userName:string ,title:string, name:string, gender:string, mnemonic:string, Sector:string, txn_num:string){
        console.log(`user:${userName} has created a customer of\n title:${title}\n name:${name}\n gender:${gender}\n mnemonic:${mnemonic}\n sector:${Sector}\n txn_num:${txn_num}`)
        
    }
    /**
     * 
     * @param userName:string
     * @param txn_num:string
     */
    printAuthCutomer(userName:string , txn_num:string){
        console.log(`user:${userName} has authorized a customer of txn_num:${txn_num}`)
        
    }
    /**
     * 
     * @param title 
     * @param name 
     * @param gender 
     * @param mnemonic 
     * @param Sector 
     * @param txn_num 
     */
    exportExcel(data: any[], filename: string, creator: string, author: string) {
        if (!Array.isArray(data)) {
            throw new Error("Data passed to exportExcel must be an array of objects.");
        }
        // Add creator and author to each data object
        const enrichedData = data.map(item => ({
            ...item,
            creator,
            author
        }));
        const worksheet = XLSX.utils.json_to_sheet(enrichedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, `${filename}.xlsx`);
    }

    printCurrentAccount(userName:string, txn_num:string){
        console.log(`user:${userName} has created a current account for customer of txn_num:${txn_num}`)
    }

    printSavingAccount(userName:string, txn_num:string){
        console.log(`user:${userName} has created a saving account for customer of txn_num:${txn_num}`)
    }

    error(message: string): void {
    console.error(message);
  }
}