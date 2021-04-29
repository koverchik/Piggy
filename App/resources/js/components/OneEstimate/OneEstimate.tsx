import React, { useEffect, useState } from "react";
import './_OneEstimate.scss';
import AddRow from "./AddRowEstimate/AddRowEstimate";
import { observer } from "mobx-react-lite";
import store from "../../state/index";

const OneEstimate: React.FC = observer((props : any) => {
   
    store.Estimate.idEstimate = props.match.params.id;
    const result : any =  store.Estimate.requestOneEstimate();
    const [listRowsEstimate, setlistRowsEstimate] = useState([]);
   
    useEffect(() => {

        result.then((data: any) => {
            if(data === "Error"){
                const list : any  =  ( <tr key={"RowEstimate"} className="error-table">
                                           Упс... Что-то пошло не так, попробуйте перезагрузить страницу
                                        </tr>)
                  setlistRowsEstimate(list);
             }else{
                const list : any  = data.map((item: any, i: any ) => {
                    return ( <tr key={"RowEstimate"+i}>
                                  <td className="namber-one-item"> {i + 1 } </td>
                                     <td className="name-one-item" > {item['name']} </td>
                                   <td className="cost-one-item"> {item['amount']} руб </td>
                               </tr>)
               })  
               setlistRowsEstimate(list);
             }


        } )
     }, [store.Estimate.sumRows]);

    return (
    <div className="wrapper-one-estimate">
        <div className="one-estimate">
            <div className="wrapper-header-one-estimate">
                <h2 className="header-one-estimate">{ store.Estimate.nameEstimate }</h2>
                <div className="wrapper-button-edit-one-estimate"><img src="../images/pensil.svg"></img></div>
            </div>
            <table className="table-list-value">
                <thead>
                    <tr>
                        <td className="empty-head-item">  </td>
                        <td className="name-head-one-item">Название</td>
                        <td className="cost-head-one-item"> Стоимость </td>
                    </tr>
                </thead>
                <tbody> 
                   { listRowsEstimate }
                </tbody>
                <tfoot>
                <tr>
                        <td className="empty-item">  </td>
                        <td className="title-cost-all-item"> Итого:  </td>
                        <td className="cost-all-item"> { store.Estimate.sumRows } руб </td>
                    </tr>
                </tfoot>
            </table>
            <AddRow />
        </div>
    </div>
       
    )
});
export default OneEstimate;