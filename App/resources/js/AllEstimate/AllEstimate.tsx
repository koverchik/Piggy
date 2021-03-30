import React from "react";
import './_AllEstimate.scss';
import ButtonAdd from "../ButtonAdd/ButtonAdd";

const AllEstimate: React.FC = () => {
    return (
    <div className="wrapper-list-estimate">
        <div className="wrapper-page-list-estimate">
            <h2>Кошельки</h2>

            <div className="wrappter-one-estimate">
                <div className="wrapper-header-estimate">
                    <div className="name-estimate">Хоз расходы</div>
                    <div className="delete-one-estimate"><img src="../images/delete-estimate.svg"></img></div>
                </div>
                <div className="wrapper-one-table">
                    <table>
                        <thead>
                            <tr>
                                <td >  </td>
                                <td >Пользователи</td>
                                <td> Права </td>
                            </tr>
                        </thead>
                        <tbody> 
                            <tr>
                                <td className="namber-one-item"> 1 </td>
                                <td className="name-one-item" > Олег <img src="../images/delete-one-peope.svg"></img></td>
                                <td className="premission-one-item"> Владелец <img src="../images/list-premision.svg"></img></td>
                            </tr>
                            <tr>
                                <td className="namber-one-item"> 2 </td>
                                <td className="name-one-item"> Маша <img src="../images/delete-one-peope.svg"></img></td>
                                <td className="premission-one-item"> Редактор <img src="../images/list-premision.svg"></img></td>
                            </tr>
                        </tbody>
                    </table>
                    <ButtonAdd />
                </div>
            </div>
            

            <div className="wrappter-one-estimate">
                <div className="wrapper-header-estimate">
                    <div className="name-estimate">Холодильник</div>
                    <div className="delete-one-estimate"><img src="../images/delete-estimate.svg"></img></div>
                </div>
                <div className="wrapper-one-table">
                    <table>
                        <thead>
                            <tr>
                                <td >  </td>
                                <td >Пользователи</td>
                                <td> Права </td>
                            </tr>
                        </thead>
                        <tbody> 
                            <tr>
                                <td className="namber-one-item"> 1 </td>
                                <td className="name-one-item" > Олег <img src="../images/delete-one-peope.svg"></img></td>
                                <td className="premission-one-item"> Владелец <img src="../images/list-premision.svg"></img></td>
                            </tr>
                            <tr>
                                <td className="namber-one-item"> 2 </td>
                                <td className="name-one-item"> Саша <img src="../images/delete-one-peope.svg"></img></td>
                                <td className="premission-one-item"> Просмотр    <img src="../images/list-premision.svg"></img></td>
                            </tr>
                        </tbody>
                    </table>
                    <ButtonAdd />
                </div>
            </div>


            <div className="pagination-list-estimate">
                <div><img src="../images/pagination-left.svg" alt="pagination"/></div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div><img src="../images/pagination-right.svg" alt="pagination"/></div>
            </div>
        </div>
    </div>
       
    )
};
export default AllEstimate;