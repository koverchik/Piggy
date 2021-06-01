import { makeObservable, action, observable, configure } from "mobx";
import axios from 'axios';


configure({
    enforceActions: "never",
  })
  
export default class Wallet {
    newDataRaw = "";

    constructor() {
      makeObservable(this, {
        newDataRaw: observable,
        startWalet: action,
        addZero: action, 
      })
    }
    addZero(number:number){
      return number<10 ? `0${number}` : number;   
    }
    
    startWalet(){
      const nowDay = new Date();
      this.newDataRaw = `${nowDay.getFullYear()}-${this.addZero(nowDay.getMonth())}-${this.addZero(nowDay.getDate())}`;
    }
    
}