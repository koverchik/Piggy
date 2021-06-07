import React, { useEffect, useState, useCallback } from "react";
import './_TableOneWallet.scss';
import './../_OneWallet.scss';
import AddNewRowWallet from "./AddNewRowWallet/AddNewRowWallet";
import { observer } from "mobx-react-lite";
import store from "../../../state";

const TableOneWallet: React.FC = observer(() => {

const [listRowsWallet, setlistRowsWallet] = useState([]);


useEffect(() => {
    store.Wallet.startOneWalet().then((data: any) => {
            if(data === "Error"){
                const messageError: any =   
                (<tr className="error-one-walet">    
                    <td colSpan={5}>
                        Что-то пошло не так, попробуйте перезагрузить страницу
                    </td>
                </tr>)
                setlistRowsWallet(messageError);
            }else{
                store.Wallet.allRows = data.data.rows;
                store.Wallet.lengthRows = data.data.rows.length;
                setlistRowsWallet(createListRows(store.Wallet.allRows));
            }
        
        })

}, [])

function createListRows(data:any) {
    const result:any = data.map((item: any, i: number) => {
        const dataOneRow = new Date(item["created_at_time"]);
        store.Wallet.allSumm += item["amount"];
                    return(
                        <tr key={"row-walet-" + i}>
                            <td className="namber-one-item"> {i+1} </td>
                            <td className="data-item">{`${store.Wallet.addZero(dataOneRow.getDate())}.${store.Wallet.addZero(dataOneRow.getMonth()+1)}.${dataOneRow.getFullYear()}`}</td>
                            <td className="name-one-item" > {item["name"]} </td>
                            <td className="cost-one-item"> {item["amount"]} руб </td>
                            <td className="user-write-item"><img src="../images/people.svg"></img> </td>
                        </tr>
                    )
                })  
    return result;
}


    return (
            <div className="wrapper-tables-list-add">
                <table className="table-list-value">
                    <thead>
                        <tr>
                            <td className="empty-head-item">  </td>
                            <td className="data-head-item">Дата</td>
                            <td className="name-head-one-item">Название</td>
                            <td className="cost-head-one-item"> Стоимость </td>
                            <td className="empty-head-item-user">  </td>
                        </tr>
                    </thead>
                    <tbody> 
                        { listRowsWallet }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="empty-item">  </td>
                            <td className="empty-item">  </td>
                            <td className="title-cost-all-item"> Итого:  </td>
                            <td className="cost-all-item"> {store.Wallet.allSumm.toFixed(2)} руб </td>
                        </tr>
                    </tfoot>
                </table>
                <AddNewRowWallet />
            </div>
    )
})
export default TableOneWallet;