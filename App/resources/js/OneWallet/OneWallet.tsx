import React from "react";
import './_OneWallet.scss';

const OneWallet: React.FC = () => {
    return (
    <div className="wrapper-one-wallet">
        <div className="one-wallet">
            <div className="wrapper-header-one-wallet">
                <h2 className="header-one-wallet">Хоз расходы</h2>
                <div className="wrapper-button-edit-one-wallet"><img src="../images/pensil.svg"></img></div>
            </div>
            <div className="wrapper-table-wallet">
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
                    <table className="table-add-new-value">
                        <tbody> 
                            <tr>
                                <td className="namber-one-item"> 3 </td>
                                <td className="data-new-one-item"><input type="date"></input></td>
                                <td className="new-one-item"> <input></input> </td>
                                <td className="new-cost-one-item" > <input></input> </td>
                                <td className="user-write-item"><img src="../images/people.svg"></img> </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <div className="button-add-new-item">
                            <img src="../images/plus.svg"></img>
                        </div>
                    </div>
                </div>
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
                </div>
            </div>
        </div>
    </div>
       
    )
};
export default OneWallet;