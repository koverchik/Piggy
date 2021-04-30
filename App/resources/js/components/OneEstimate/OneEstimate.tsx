import React, { useEffect, useState } from "react";
import './_OneEstimate.scss';
import AddRow from "./AddRowEstimate/AddRowEstimate";
import { observer } from "mobx-react-lite";
import store from "../../state/index";


const OneEstimate: React.FC = observer((props : any) => {
   
    store.Estimate.idEstimate = props.match.params.id;
    const result : any =  store.Estimate.requestOneEstimate();
    const [listRowsEstimate, setlistRowsEstimate] = useState([]);
    const [listPaginationEstimate, setlistPaginationEstimate] = useState([]);
    
   
    useEffect(() => {

        result.then((data: any) => {

            if(data === "Error"){
                const list : any  =  ( <tr key={"RowEstimate"} className="error-table">
                                           Упс... Что-то пошло не так, попробуйте перезагрузить страницу
                                        </tr>)
                  setlistRowsEstimate(list);
             }else{
                store.Estimate.dataRows = data;
                const lengthData : any = store.Estimate.pagination.length;
                createList(data, lengthData);
            //    const resultPagination : any = store.Estimate.pagination.map((item: number, i: number) =>{
            //     return ( 
            //         <div key={"pagination" + item } className= { (lengthData == item) ? "pagination-estimate active-number" : "pagination-estimate" } onClick={clickPagination}> { item }</div>
            //      )
            //    })
            //    setlistPaginationEstimate(resultPagination);
                createNumberPagination();
             }
        } )

     }, [store.Estimate.sumRows]);

     function clickPagination( e: any ){
        store.Estimate.activePagination !== e.target.textContent ? store.Estimate.activePagination = e.target.textContent: "";
       
     }
     function createNumberPagination() {
        const resultPagination : any = store.Estimate.pagination.map((item: number, i: number) =>{
            return ( 
                <div key={"pagination" + item } className= { (store.Estimate.activePagination == item) ? "pagination-estimate active-number" : "pagination-estimate" } onClick={clickPagination}> { item }</div>
             )
           })
           setlistPaginationEstimate(resultPagination);
     }
     function createList( data: any, pagination: number ){
        const list : any  = data.map((item: any, i: number) => {
            return ( <tr key={"RowEstimate"+i} className={ !((pagination-1) * 10 < i+1 && i+1 <= (pagination-1)*10 + 10)  ? "display-none": ""}>
                          <td className="namber-one-item"> { i + 1 } </td>
                          <td className="name-one-item"> { item['name'] } </td>
                          <td className="cost-one-item"> { item['amount'] } руб </td>
                       </tr>)
       })  
       setlistRowsEstimate(list);
     }

     useEffect(() => {
        createList(store.Estimate.dataRows, store.Estimate.activePagination);
        createNumberPagination();
     }, [store.Estimate.activePagination])

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
            <div className="wrapper-number-pagination">
                <img src="../images/arrow-left.svg" onClick={()=> {store.Estimate.activePagination > 1 ?
                    store.Estimate.activePagination = store.Estimate.activePagination - 1 :
                    "";}} alt="arrow-left" arrow-data="left" className="image-pagination"/>
                 { listPaginationEstimate }
                <img src="../images/arrow-right.svg" onClick={()=> {store.Estimate.activePagination < store.Estimate.pagination.length ?
                                                                    store.Estimate.activePagination = +store.Estimate.activePagination + 1 : "";
                                                                               }} alt="piggy" arrow-data="right" className="image-pagination"/>
            </div>
            <AddRow />
        </div>
    </div>
       
    )
});
export default OneEstimate;