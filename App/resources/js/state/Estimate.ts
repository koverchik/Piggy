import { makeObservable, action, observable } from "mobx";
import axios from 'axios';

export default class Estimate {
  
  idEstimate = "";
  nameEstimate = "";
  reactElemRows = new Array();
  dataRows = new Array();
  rowsLength = "";
  sumRows = "";
  newRow = "";
  newRowCost = "";
  pagination = new Array();
  reactElemPagination = new Array();
  activePagination = 0;
  validationNewRow = false;
  validationNewRowCost = false;
  messegeNewRow = "";
  messegeNewRowCost = "";    
  
  constructor() {
    makeObservable(this, {
      idEstimate : observable,
      sumRows: observable,
      rowsLength: observable,
      dataRows: observable,
      nameEstimate: observable,
      newRow: observable,
      reactElemPagination: observable,
      newRowCost: observable,
      pagination: observable,
      reactElemRows: observable,
      activePagination: observable,
      requestOneEstimate: action,
      requestNewRow: action,
      deleteRow: action,
      validationAdd: action,
      },
    );
  }

  

  async requestOneEstimate(){

    const result = axios.post(process.env.MIX_APP_URL_FOR_TEST +'one-estimates', {id: this.idEstimate } )
    .then(response => {
     
      this.nameEstimate  = response.data[0].name;
      this.rowsLength = response.data.rows.length + 1;
      const countPagination = Math.ceil(response.data.rows.length / 10);
      let arrayPagination = [];
      for (let index = 0; index < countPagination; index++) {
        arrayPagination.push( index + 1 );
      }
      this.pagination = arrayPagination;
   
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

  validationAdd(){
    // if(this.newRow.length > 2 &&)
    // this.newRow
    // this.newRowCost
    // validationNewRow = false;
    // validationNewRowCost = false;
    // messegeNewRow = "";
    // messegeNewRowCost = ""; 
      // name: this.newRow, 
      // cost:this.newRowCost, 
      // name: 'required|string|min:2|max:150',
      // cost: 'required|numeric',
    
  }

  requestNewRow(){

    const id_user = "9";

  
    const result = axios.post(process.env.MIX_APP_URL_FOR_TEST + 'write-one-estimates', {id: this.idEstimate, name: this.newRow, cost:this.newRowCost, id_user: id_user} )
      .then(response => {
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
    deleteRow( numberRow: number ){
      axios.post(process.env.MIX_APP_URL_FOR_TEST + 'delete-estimate', { id_row: numberRow })
      .then(response => {
        if(response.status === 200){
          this.requestOneEstimate();
        }

       },
      response => {
        console.log("error request " + response);      
        alert("Что-то пошло не так, попробуйте перезагрузить страницу...")  
          })
         
    }

}
