import React from "react";
import './_TableOneWallet.scss';
import './../_OneWallet.scss';
import AddNewRowWallet from "./AddNewRowWallet/AddNewRowWallet";

const TableOneWallet: React.FC = () => {
    
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
                        <tr>
                            <td className="namber-one-item"> 1 </td>
                            <td className="data-item">24.03.2021</td>
                            <td className="name-one-item" > Торт </td>
                            <td className="cost-one-item"> 10 руб </td>
                            <td className="user-write-item"><img src="../images/people.svg"></img> </td>
                        </tr>
                        <tr>
                            <td className="namber-one-item"> 2 </td>
                            <td className="data-item">25.03.2021</td>
                            <td className="name-one-item"> Сок </td>
                            <td className="cost-one-item"> 5 руб </td>
                            <td className="user-write-item"><img src="../images/people.svg"></img> </td>
                        </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                            <td className="empty-item">  </td>
                            <td className="empty-item">  </td>
                            <td className="title-cost-all-item"> Итого:  </td>
                            <td className="cost-all-item"> 15 руб </td>
                        </tr>
                    </tfoot>
                </table>
                <AddNewRowWallet/>
            </div>
    )
}
export default TableOneWallet;