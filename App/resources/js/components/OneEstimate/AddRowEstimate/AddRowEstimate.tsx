import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import store from "../../../state/index";

const AddRowEstimate: React.FC = observer((props : any) => {
    function requestNewRow(event:any){
        store.Estimate.requestNewRow();
        event.preventDefault();
    }
   return (
        <div>
            <form onSubmit={ requestNewRow  }>
                <table className="table-add-new-value">
                <tbody> 
                    <tr>
                        <td className="namber-one-item"> { store.Estimate.rowsLength } </td>
                        <td className="new-one-item">  <input type="text" value={ store.Estimate.newRow } onChange={(event)=>{store.Estimate.newRow = event.target.value}}></input> </td>
                        <td className="new-cost-one-item" > <input type="text" value={ store.Estimate.newRowCost } onChange={(event)=>{ store.Estimate.newRowCost = event.target.value}}></input> </td>
                    </tr>
                </tbody>
                </table>
                <div>
                    <input className="button-add-new-item " type="submit" value="+" />          
                </div>
           </form>
           <div>{ store.Estimate.test}</div>
        </div>
    )
});
export default AddRowEstimate;

