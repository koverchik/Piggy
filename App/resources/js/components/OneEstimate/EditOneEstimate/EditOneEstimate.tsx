import React, { useState } from "react";
import './_EditOneEstimate.scss';
import'./../_OneEstimate.scss';


const EditOneEstimate: React.FC = () => {

    const [valueChange, setValueChange] = useState();
    const [activeRow, setActiveRow] = useState(true);

 function changeValue(e:any) {
    setActiveRow(false);
    // const fragment = new DocumentFragment();
    // var element = document.createElement("input");
    // element.textContent = "Hello";
    // const fragment: any = (<input value={valueChange} onChange={(event:any)=>{ setValueChange(e.target.textContent)}}></input>)
    //  e.target.appendChild(fragment);
  
 }
function handleInputChange(e:any) {
    console.log(e.target.value);
    setValueChange(e.target.value);
}
    return (
    <div className="wrapper-one-estimate">
        <div className="one-estimate">
            <div className="wrapper-header-one-estimate">
                <h2 className="header-one-estimate"> Название </h2>
            </div>
            <table className="table-list-value">
                <thead>
                    <tr>
                        <td className="empty-head-item">  </td>
                        <td className="name-head-one-item">Название</td>
                        <td className="name-head-one-item"> Стоимость </td>
                        <td className="cost-head-one-item"></td>
                    </tr>
                </thead>
                <tbody> 
                    <tr>    
                        <td className="namber-one-item" > 1</td>
                        <td className="name-head-one-item" ><input type="text" 
                        value="Сок" 
                        onChange={e => { e.target.value  }} /></td>
                        <td className="cost-head-one-item">4</td>
                        <td className="namber-one-item trash-image"><img src="../images/delete-one-peope.svg"/></td>
                    </tr>
                    <tr>    
                        <td className="namber-one-item"> 2</td>
                        <td className="name-head-one-item" onClick={changeValue}><input type="text" value={activeRow? "Машина" : valueChange} onChange={e => handleInputChange(e)} /></td>
                        <td className="cost-head-one-item">3</td>
                        <td className="namber-one-item trash-image"><img src="../images/delete-one-peope.svg"/></td>
                    </tr>
                </tbody>
                <tfoot>
                   <tr>
                        <td></td>
                        <td className="title-cost-all-item" colSpan={2}> Итого: </td>
                        <td className="cost-all-item"> 3 руб </td>
                        <td className="empty-item">  </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
    )
};
export default EditOneEstimate;