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
    numberPagination = new Array();
    activePagination = 0;
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
        numberPagination: observable,
        activePagination: observable,
        startOneWalet: action,
        addZero: action, 
        addNewRow: action, 
      })
    }
    addZero(number:number){
      return number<10 ? `0${number}` : number;   
    }
    
    async startOneWalet(){
      const nowDay = new Date();
      this.newDataRaw = `${nowDay.getFullYear()}-${this.addZero(nowDay.getMonth()+1)}-${this.addZero(nowDay.getDate())}`;
      
      const result = axios.post(process.env.MIX_APP_URL_FOR_TEST +'one-wallets', {id: this.idWallet } )
        .then(response => {
          const summAllRows : number = response.data.rows.reduce(function(sum: number, elem: any) {
              return sum + elem.amount;
          }, 0);
        const quantity : number = Math.ceil(this.lengthRows/10); 
        const arrayForPagination = new Array();
        for (let i = 0; i < quantity; i++) {
          arrayForPagination.push(i+1);
        }
        this.numberPagination = arrayForPagination;
        this.activePagination = this.numberPagination.length;
        this.allSumm = +summAllRows.toFixed(2);
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
          this.startOneWalet();
          this.newRowWallet = "";
          this.newRowCost = "";            
 
        }
      },
      response => {
        console.log("error request " + response);
        return "Error";

          })
    }

}