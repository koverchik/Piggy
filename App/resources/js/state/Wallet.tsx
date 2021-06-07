import { makeObservable, action, observable, configure } from "mobx";
import axios from 'axios';


configure({
    enforceActions: "never",
  })
  
export default class Wallet {
    newDataRaw = "";
    idWallet = "";
    allSumm = 0;
    newRowWallet = "";
    newRowCost = "";
    allRows= new Array();
    lengthRows = 0;

    constructor() {
      makeObservable(this, {
        newDataRaw: observable,
        idWallet:observable,
        allSumm: observable,
        newRowWallet: observable,
        newRowCost:observable,
        allRows: observable,
        lengthRows: observable,
        startOneWalet: action,
        addZero: action, 
        addNewRow: action, 
      })
    }
    addZero(number:number){
      return number<10 ? `0${number}` : number;   
    }
    
    startOneWalet(){
      const nowDay = new Date();
      this.newDataRaw = `${nowDay.getFullYear()}-${this.addZero(nowDay.getMonth()+1)}-${this.addZero(nowDay.getDate())}`;
      
      const result = axios.post(process.env.MIX_APP_URL_FOR_TEST +'one-wallets', {id: this.idWallet } )
        .then(response => {
          return response;
        },
        response => {
          console.log("error request " + response);
          return "Error";

            })
      return result;
    }

    addNewRow(){

      const data = {
                  date: this.newDataRaw,
                  name: this.newRowWallet,
                  cost: this.newRowCost,
                  namesWalletsId: this.idWallet
                }

      const result = axios.post(process.env.MIX_APP_URL_FOR_TEST +'add-new-row-wallet', { data: data })
      .then(response => {
        if(response.status === 200){
          this.allSumm = this.allSumm + (+this.newRowCost);
          this.lengthRows += 1;
          this.allRows.push(data);         
          return response;
        }
      },
      response => {
        console.log("error request " + response);
        return "Error";

          })

    return result;
    }
}