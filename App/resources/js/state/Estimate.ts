import { makeObservable, action, observable, set, toJS, configure, autorun, runInAction } from "mobx";
import axios from 'axios';
import env from "react-dotenv";



export default class Estimate {
  
  idEstimate = "";
  nameEstimate = "";
  rowsLength = "";
  sumRows = "";
  newRow = "";
  newRowCost = "";
  test = null;
  
  constructor() {
    makeObservable(this, {
      idEstimate : observable,
      sumRows: observable,
      rowsLength: observable,
      nameEstimate: observable,
      newRow: observable,
      test:observable,
      newRowCost: observable,
      requestOneEstimate: action,
      requestNewRow: action,
      },
    );
  }

  

  async requestOneEstimate(){
  
  const result = axios.post('http://localhost:8000/one-estimates', {id: this.idEstimate } )
    .then(response => {
      this.nameEstimate  = response.data[0].name;
      this.rowsLength = response.data.rows.length+ 1;

      const summAllRows : number = response.data.rows.reduce(function(sum: number, elem: any) {
          return sum + elem.amount;
      }, 0);

      this.sumRows =  summAllRows.toFixed(2);
       
      return response.data.rows;
   
       },
       
      response => {
        console.log("error request " + response);
        return "Error";
        
          })
    return result;
  }

  requestNewRow(){
    const id_user = "9";
    
    const result = axios.post('http://localhost:8000/write-one-estimates', {id: this.idEstimate, name: this.newRow, cost:this.newRowCost, id_user: id_user} )
      .then(response => {
        console.log(response.status);
        if(response.status === 200){
          this.requestOneEstimate();
          this.newRow = "";
          this.newRowCost = "";
        }

       },
      response => {
        console.log("error request " + response);
        alert("Error" + response);
        
          })
          
        
  }

}
