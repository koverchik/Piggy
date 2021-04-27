import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import store from "../../../state/index";

const AddRowEstimate: React.FC = observer((props : any) => {
    return (
        <div>
            <table className="table-add-new-value">
            <tbody> 
                <tr>
                    <td className="namber-one-item"> { store.Estimate.rowsLength } </td>
                    <td className="new-one-item"> <input></input> </td>
                    <td className="new-cost-one-item" > <input></input> </td>
                </tr>
            </tbody>
            </table>
            <div>
                <div className="button-add-new-item">
                    <img src="../images/plus.svg"></img>
                </div>
            </div>
        </div>
      
    )
});
export default AddRowEstimate;

