import React, { useEffect, useState } from "react";
import store from "../../../../state";
import '../../../OneEstimate/PaginationRows/_PaginationRows.scss';
import { observer } from "mobx-react-lite";

const PaginationRows: React.FC = observer(() => {
    const [listNumberPagination, setListNumberPagination] = useState();

    useEffect(() => {
        const resultPagination : any = store.Wallet.numberPagination.map((i:number, item:number )=>{
        return (
            <div key={"pagination" + i} className="pagination-walet">{ item }</div>
        )
     })
    setListNumberPagination(resultPagination);
    }, [])

    return (
        <div className="wrapper-number-pagination">
            <img src="../images/arrow-left.svg" alt="left"/>
            <div className="wrapper-number-pagination">
                { listNumberPagination }
            </div>
            <img src="../images/arrow-right.svg" alt="right" />
        </div>
 
    
        )
})
export default PaginationRows;