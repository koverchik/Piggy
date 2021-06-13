import React, { useEffect, useState } from "react";
import store from "../../../../state";
import '../../../OneEstimate/PaginationRows/_PaginationRows.scss';
import { observer } from "mobx-react-lite";

const PaginationRows: React.FC = observer(() => {
    const [listNumberPagination, setListNumberPagination] = useState();

    useEffect(() => {    
    createNumberPagination();
    }, [store.Wallet.activePagination])

    function createNumberPagination() {
        const resultPagination : any = store.Wallet.numberPagination.map((item: number) =>{
            return ( 
                <div key={"pagination" + item } 
                     className= { (store.Wallet.activePagination == item) ? 
                                    "pagination-estimate active-number" : "pagination-estimate" } 
                     onClick={clickPagination}> 
                     { item }
                </div>
             )
           })
           setListNumberPagination(resultPagination);
     }
     function clickPagination( e: any ){
        store.Wallet.activePagination !== e.target.textContent ? store.Wallet.activePagination = e.target.textContent: "";
   
     }
    return (
        <div className="wrapper-number-pagination">
            <img src="../images/arrow-left.svg" onClick={()=> {store.Wallet.activePagination > 1 ?
                store.Wallet.activePagination = store.Wallet.activePagination - 1 :
                "";}} alt="arrow-left" 
                className={store.Wallet.activePagination == 1 ? "disable-pagination image-pagination" : "image-pagination"}/>
            { listNumberPagination }
            <img src="../images/arrow-right.svg" onClick={()=> {store.Wallet.activePagination < store.Wallet.numberPagination.length ?
                                                                store.Wallet.activePagination = +store.Wallet.activePagination + 1 : "";
                                                                        }} alt="arrow-right"
            className={store.Wallet.activePagination == store.Wallet.numberPagination.length ? "disable-pagination image-pagination" : "image-pagination"} />
        </div>
        )
})
export default PaginationRows;