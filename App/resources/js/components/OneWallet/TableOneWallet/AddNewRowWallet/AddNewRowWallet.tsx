import React from "react";
import './_AddNewRowWallet.scss';



const AddNewRowWallet: React.FC = () => {
    
    return (
        <div>
            <table className="table-add-new-value">
                <tbody> 
                    <tr>
                        <td className="namber-one-item"> 3 </td>
                        <td className="data-new-one-item"><input type="date"></input></td>
                        <td className="new-one-item"> <input></input> </td>
                        <td className="new-cost-one-item" > <input></input> </td>
                        <td className="user-write-item"><img src="../images/people.svg"></img> </td>
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
}
export default AddNewRowWallet;