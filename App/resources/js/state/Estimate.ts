import { makeObservable, action, observable, set, toJS, configure, autorun, runInAction } from "mobx";
import axios from 'axios';



export default class Estimate {
  
  idEstimate = "";
  nameEstimate = "";
  rowsLength = "";
  sumRows = "";
 
  
  constructor() {
    makeObservable(this, {
      idEstimate : observable,
      sumRows: observable,
      rowsLength: observable,
      nameEstimate: observable,
      requestOneEstimate: action,
      },
    );
  }

  

  async requestOneEstimate(){
    
  const result = axios.post('http://localhost:8000/one-estimates', {id: this.idEstimate } )
    .then(response => {
      this.nameEstimate  = response.data[0].name;
      this.rowsLength = response.data.rows.length+ 1;

      this.sumRows = response.data.rows.reduce(function(sum: number, elem: any) {
          return sum + elem.amount;
      }, 0);
       return response.data.rows;
   
       },
       
      response => {
        console.log("error request " + response);
        return "Error";
        
          })
    return result;
  }

}
