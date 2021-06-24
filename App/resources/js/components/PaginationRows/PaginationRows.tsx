import React, { useEffect, useState } from "react";
import './_PaginationRows.scss';
import { observer } from "mobx-react-lite";

const PaginationRows: React.FC = observer((props: any) => {

    const [listPaginationEstimate, setlistPaginationEstimate] = useState([]);
    
    function createNumberPagination() {

        const resultPagination : any = props.arrayNumber.map((item: number) =>{
            return ( 
                <div key={"pagination" + item } 
                     className= { (props.activeNumber == item) ? 
                                    "pagination-estimate active-number" : "pagination-estimate" } 
                     onClick={props.callbackPaginationArray}> 
                     { item }
                </div>
             )
           }) 
           setlistPaginationEstimate(resultPagination);
     }

     useEffect(() => {
     createNumberPagination();
     }, [props.activeNumber])

    return (
        <div className="wrapper-number-pagination">
            <img src="../images/arrow-left.svg" onClick={props.callbackPaginationLeft} alt="arrow-left" 
                className={props.activeNumber == 1 ? "disable-pagination image-pagination" : "image-pagination"}/>
            { listPaginationEstimate }
            <img src="../images/arrow-right.svg" onClick={props.callbackPaginationRight} alt="arrow-right"
            className={props.activeNumber == props.arrayNumber.length ? "disable-pagination image-pagination" : "image-pagination"} />
        </div>
        )
})
export default PaginationRows;