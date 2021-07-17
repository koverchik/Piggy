import React, { useEffect, useState } from "react";
import './_OneEstimate.scss';
import AddRow from "./AddRowEstimate/AddRowEstimate";
import { observer } from "mobx-react-lite";
import store from "../../state/index";
import Pagination from "../PaginationRows/PaginationRows";
import PaginationInterface from "../../interfaces/interfacesPagination";

const OneEstimate: React.FC = observer((props : any) => {
   
    store.Estimate.idEstimate = props.match.params.id;
    const [listRowsEstimate, setlistRowsEstimate] = useState([]);

    useEffect(() => {
        createList(store.Estimate.dataRows, store.Estimate.activePagination);
        }, [store.Estimate.activePagination])

    const paginationData: PaginationInterface = {
        arrayNumber: store.Estimate.pagination,
        activeNumber: store.Estimate.activePagination,
        callbackPaginationArray: store.Estimate.callbackPaginationArray,
        callbackPaginationLeft: store.Estimate.callbackPaginationLeft,
        callbackPaginationRight: store.Estimate.callbackPaginationRight,
        }

    useEffect(() => {
        store.Estimate.requestOneEstimate().then((data: any) => {
            if(data === "Error"){
                const list : any  =  ( <tr key={"RowEstimate"} className="error-table">
                                            <td colSpan={4}>
                                                Упс... Что-то пошло не так, попробуйте перезагрузить страницу
                                            </td>
                                        </tr>)
                 setlistRowsEstimate(list);
             }else{
                store.Estimate.dataRows = data;
                const lengthData : number = store.Estimate.pagination.length;
                store.Estimate.activePagination = store.Estimate.pagination.length;
                if(lengthData === 0){
                    const list : any  =  ( <tr key={"RowEstimate"} className="error-table">
                                                <td colSpan={4}>
                                                    Здесь пока ничего нет, попробуйте добавить несколько строк
                                                </td>
                                            </tr>)
                    setlistRowsEstimate(list);
                }else{
                    createList(data, lengthData);
                }               
             }
        } )

     }, [store.Estimate.sumRows]);


     function createList( data: any, pagination: number ){
        const list : any  = data.map((item: any, i: number) => {          
            return ( <tr key={"RowEstimate"+i} 
                         className={ !((pagination-1) * 10 < i+1 && i+1 <= (pagination-1)*10 + 10)  ? "display-none": ""}>
                          <td className="namber-one-item"> { i + 1 } </td>
                          <td className="name-one-item"> { item['name'] } </td>
                          <td className="cost-one-item"> { item['amount'] } руб </td>
                          <td className="namber-one-item trash-image">
                            <img src="../images/delete-one-peope.svg" 
                                id-data={item['id']} 
                                onClick={ (e:any)=>store.Estimate.deleteRow(e.target.getAttribute("id-data")) }/>
                          </td>
                       </tr>)
       })  
       setlistRowsEstimate(list);
     }

    return (
    <div className="wrapper-one-estimate">
        <div className="one-estimate">
            <div className="wrapper-header-one-estimate section-to-print">
                <h2 className="header-one-estimate">{ store.Estimate.nameEstimate }</h2>
                <a media="print" onClick={() => window.print()}><div className="wrapper-button-edit-one-estimate"><img src="../images/print.svg"></img></div></a>
            </div>
            <table className="table-list-value section-to-print-table">
                <thead>
                    <tr>
                        <td className="empty-head-item">  </td>
                        <td className="name-head-one-item">Название</td>
                        <td className="name-head-one-item"> Стоимость </td>
                        <td className="cost-head-one-item"></td>
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
            {store.Estimate.pagination.length > 1 ? <Pagination {...paginationData}/> : ""}    
            <AddRow />
        </div>
    </div>
    )
});
export default OneEstimate;