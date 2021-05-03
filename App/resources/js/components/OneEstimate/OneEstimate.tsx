import React, { useEffect, useState } from "react";
import './_OneEstimate.scss';
import AddRow from "./AddRowEstimate/AddRowEstimate";
import { observer } from "mobx-react-lite";
import store from "../../state/index";

const OneEstimate: React.FC = observer((props : any) => {
   
    store.Estimate.idEstimate = props.match.params.id;
    const [listRowsEstimate, setlistRowsEstimate] = useState([]);
    const [listPaginationEstimate, setlistPaginationEstimate] = useState([]);

    useEffect(() => {

        store.Estimate.requestOneEstimate().then((data: any) => {

            if(data === "Error"){
                const list : any  =  ( <tr key={"RowEstimate"} className="error-table">
                                           Упс... Что-то пошло не так, попробуйте перезагрузить страницу
                                        </tr>)
                  setlistRowsEstimate(list);
             }else{
                store.Estimate.dataRows = data;
                const lengthData : any = store.Estimate.pagination.length;
                store.Estimate.activePagination = store.Estimate.pagination.length;
                createList(data, lengthData);
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
                          <td className="namber-one-item trash-image"><img src="../images/delete-one-peope.svg" id-data={item['id']} onClick={ (e:any)=>store.Estimate.deleteRow(e.target.getAttribute("id-data")) }/></td>
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
            <div className="wrapper-number-pagination">
                <img src="../images/arrow-left.svg" onClick={()=> {store.Estimate.activePagination > 1 ?
                    store.Estimate.activePagination = store.Estimate.activePagination - 1 :
                    "";}} alt="arrow-left" 
                    className={store.Estimate.activePagination == 1 ? "disable-pagination image-pagination" : "image-pagination"}/>
                 { listPaginationEstimate }
                <img src="../images/arrow-right.svg" onClick={()=> {store.Estimate.activePagination < store.Estimate.pagination.length ?
                                                                    store.Estimate.activePagination = +store.Estimate.activePagination + 1 : "";
                                                                               }} alt="piggy"
                 className={store.Estimate.activePagination == store.Estimate.pagination.length ? "disable-pagination image-pagination" : "image-pagination"} />
            </div>
            <AddRow />
        </div>
    </div>
       
    )
});
export default OneEstimate;