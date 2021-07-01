import { makeObservable, action, observable, configure } from "mobx";
import axios from 'axios';

configure({
    enforceActions: "never",
  })
  
export default class GeneralData {
    idUser = 9;
    nameAllEstimates = 0;
    nameAllWallets = 0;
    activePaginationAllWallets = 0;
    activePaginationAllEstimates = 0;
    arrayNameAllEstimates = new Array;
    arrayNameAllWallets = new Array;
    allDataEstimate = {};
    allDataWallets = {};

    constructor() {
        makeObservable(this, {
            idUser : observable,
            nameAllEstimates : observable,
            arrayNameAllEstimates:observable,
            nameAllWallets : observable,
            allDataEstimate: observable,
            allDataWallets: observable,
            activePaginationAllWallets: observable,
            activePaginationAllEstimates: observable,
            arrayNameAllWallets: observable,
            allWallets: action,
            allEstimates: action,
          },
        );
    }

    allEstimates(){

    const result = axios.post(process.env.MIX_APP_URL_FOR_TEST +'all-estimates', {id: this.idUser } )
        .then(response => {
        const countNameEstimates: number = Math.ceil(response.data.length / 10)
        let arrayPaginationEstimate = [];
        for (let index = 0; index < countNameEstimates; index++) {
            arrayPaginationEstimate.push(index+1);
        }
        this.activePaginationAllEstimates = arrayPaginationEstimate.length;       
        this.arrayNameAllEstimates = arrayPaginationEstimate;
        return response.data;
        },
        
        response => {
            console.log("error request " + response);
            return "Error";
            
            })
    return result;
    }

    allWallets(){
       const result = axios.post(process.env.MIX_APP_URL_FOR_TEST +'all-wallets', {id: this.idUser } )
        .then(response => {
        const countPaginationWallets: number = Math.ceil(response.data.length / 10);
        let arrayPaginationWallets = [];
        for (let index = 0; index < countPaginationWallets; index++) {
            arrayPaginationWallets.push( index + 1 );
          }
        this.arrayNameAllWallets = arrayPaginationWallets;
        this.activePaginationAllWallets = this.arrayNameAllWallets.length;         
        return response.data;
    
        },
        
        response => {
            console.log("error request " + response);
            return "Error";
            
            })
    return result;
    }

}