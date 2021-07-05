import { makeObservable, action, observable, configure } from "mobx";
import axios from 'axios';

configure({
    enforceActions: "never",
  })
  
export default class СreationEditingEstimates {
    
  newNameEstimate = "";
  newNameWallet = "";

  constructor() {
    makeObservable(this, {
      newNameEstimate: observable,
      newNameWallet: observable,
      createNewEstimate: action,
      onChangeFnEstimateName: action,
      onChangeFnWalletName: action,
    })
    this.onChangeFnEstimateName.bind(this);
  }
  

  createNewEstimate(event:any){
    
      
 
 
  }
  onChangeFnEstimateName = (event:any) => {
    this.newNameEstimate = event.target.value;
  }
  onChangeFnWalletName = (event:any) => {
    this.newNameWallet = event.target.value;

  }
}