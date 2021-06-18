import React, { useEffect, useState } from "react";
import './_BurdenSharing.scss';
import "../_OneWallet.scss";
import store from "../../../state";
import { observer } from "mobx-react-lite";

const BurdenSharing: React.FC = observer(() => {
    const [listScopeOneWallet, setListScopeOneWallet] = useState([]);


    useEffect(() => {
        store.Wallet.scopeOneWallet().then((data: any) => {
             createListRows(data);
        });
     }, [])

    function createListRows(data:any) {
        const result:any = data.map((item: any, i: number) => {     
            const grade: string = store.Wallet.gradeUser(item);
                        return(
                         <tr key={"scope-one-wallet" + i}>
                            <td className="name-user-table"> {item['user']['name']} </td>
                            <td className="premission-user-table"> { grade } </td>
                            <td className="contribution-user-table" > 50% <img src="../images/list-premision.svg"></img> </td>
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
        <table className="table-debit-credit">
            <thead>
                <tr>
                    <td className="empty-name-user-head-debit-credit">  </td>
                    <td className="column-head-debit"> Дебет </td>
                    <td className="column-head-credit" > Кредит </td>
                    <td className="second-side-user-head-debit-credit">  </td>
                </tr>
            </thead>
            <tbody> 
                <tr>
                    <td className="name-user-debit-credit"> Оля </td>
                    <td className="column-debit"> -10 руб </td>
                    <td className="column-credit" > 10 руб </td>
                    <td className="second-side-user-debit-credit" > Маша </td>
                </tr>
                <tr>
                    <td className="name-user-debit-credit"> Маша </td>
                    <td className="column-debit"> 10 руб </td>
                    <td className="column-credit" > -10 руб </td>
                    <td className="second-side-user-debit-credit" > Оля </td>
                </tr>
            </tbody>
        </table>
    </div>      
    )
});
export default BurdenSharing;