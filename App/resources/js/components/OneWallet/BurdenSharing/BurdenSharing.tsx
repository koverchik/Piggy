import React from "react";
import './_BurdenSharing.scss';
import "../_OneWallet.scss";

const BurdenSharing: React.FC = () => {
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
                <tr>
                    <td className="name-user-table"> Оля </td>
                    <td className="premission-user-table"> Владелец </td>
                    <td className="contribution-user-table" > 50% <img src="../images/list-premision.svg"></img> </td>
                </tr>
                <tr>
                    <td className="name-user-table"> Маша </td>
                    <td className="premission-user-table"> Редактор </td>
                    <td className="contribution-user-table" > 50% <img src="../images/list-premision.svg"></img> </td>
                </tr>
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
};
export default BurdenSharing;