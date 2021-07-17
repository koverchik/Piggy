import React, { useEffect, useState } from "react";
import './_OneEstimate.scss';
import AddRow from "./AddRowEstimate/AddRowEstimate";
import { observer } from "mobx-react-lite";
import store from "../../state/index";
import Pagination from "../PaginationRows/PaginationRows";
import PaginationInterface from "../../interfaces/interfacesPagination";
import BodyTableEstimate from "./BodyTableEstimate/BodyTableEstimate";

const OneEstimate: React.FC = observer((props : any) => {
   
    store.Estimate.idEstimate = props.match.params.id;

    const paginationData: PaginationInterface = {
        arrayNumber: store.Estimate.pagination,
        activeNumber: store.Estimate.activePagination,
        callbackPaginationArray: store.Estimate.callbackPaginationArray,
        callbackPaginationLeft: store.Estimate.callbackPaginationLeft,
        callbackPaginationRight: store.Estimate.callbackPaginationRight,
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
                <BodyTableEstimate/>
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