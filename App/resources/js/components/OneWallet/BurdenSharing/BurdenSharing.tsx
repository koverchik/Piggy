import React, { useEffect, useState } from "react";
import './_BurdenSharing.scss';
import "../_OneWallet.scss";
import store from "../../../state";
import { observer } from "mobx-react-lite";
import TableDebetCredit from "./TableDebetCredit/TableDebetCredit";

const BurdenSharing: React.FC = observer(() => {
    const [listScopeOneWallet, setListScopeOneWallet] = useState([]);
    useEffect(() => {
        store.Wallet.scopeOneWallet().then((data: any) => {
            store.Wallet.lengthBurdenUser = data.length;
            createListRows(data);
        });
     }, [])

    function createListRows(data:any) {

        const result:any = data.map((item: any, i: number) => {     
            store.Wallet.allUsers.push({
                userName: item.user.name,
                userId: item.user.id,
                debitСredit: 0,
            })
            const grade: string = store.Wallet.gradeUser(item);
            
            return(
                <tr key={"scope-one-wallet" + i}>
                <td className="name-user-table"> {item['user']['name']} </td>
                <td className="premission-user-table"> { grade } </td>
                <td className="contribution-user-table" > {(100 / store.Wallet.lengthBurdenUser).toFixed(2)}%</td>
            </tr>
            )
                    })  
        setListScopeOneWallet(result);
    }

    return (
    <div className="wapper-user-table">
        <table className="table-user">
            <thead>
                <tr>
                    <td className="head-name-user-table"> Имя </td>
                    <td className="head-premission-user-table"> Права </td>
                    <td className="head-contribution-user-table" > Вклад </td>
                </tr>
            </thead>
            <tbody> 
                { listScopeOneWallet }
            </tbody>
        </table>
        <div className="button-add-new-user">
            <img src="../images/add-user.svg"></img>
            <p>Добавить</p>
        </div>
        <TableDebetCredit/>
    </div>      
    )
});
export default BurdenSharing;