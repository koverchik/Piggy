import { makeObservable, action, observable, configure } from "mobx";
import axios from 'axios';


configure({
    enforceActions: "never",
  })
  
export default class Wallet {
    newDataRaw = "";
    idWallet = "";
    allSumm = 0;

    constructor() {
      makeObservable(this, {
        newDataRaw: observable,
        idWallet:observable,
        allSumm: observable,
        startOneWalet: action,
        addZero: action, 
        
      })
    }
    addZero(number:number){
      return number<10 ? `0${number}` : number;   
    }
    
    startOneWalet(){
      const nowDay = new Date();
      this.newDataRaw = `${nowDay.getFullYear()}-${this.addZero(nowDay.getMonth())}-${this.addZero(nowDay.getDate())}`;
      
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
    
}