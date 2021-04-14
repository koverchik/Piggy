import React from "react";
import './_OneEstimate.scss';

const OneEstimate: React.FC = () => {
    return (
    <div className="wrapper-one-estimate">
        <div className="one-estimate">
            <div className="wrapper-header-one-estimate">
                <h2 className="header-one-estimate">День рождения</h2>
                <div className="wrapper-button-edit-one-estimate"><img src="../images/pensil.svg"></img></div>
            </div>
            <table className="table-list-value">
                <thead>
                    <tr>
                        <td className="empty-head-item">  </td>
                        <td className="name-head-one-item">Название</td>
                        <td className="cost-head-one-item"> Стоимость </td>
                    </tr>
                </thead>
                <tbody> 
                    <tr>
                        <td className="namber-one-item"> 1 </td>
                        <td className="name-one-item" > Торт </td>
                        <td className="cost-one-item"> 10 руб </td>
                    </tr>
                    <tr>
                        <td className="namber-one-item"> 2 </td>
                        <td className="name-one-item"> Сок </td>
                        <td className="cost-one-item"> 5 руб </td>
                    </tr>
                </tbody>
                <tfoot>
                <tr>
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
                        <td className="new-one-item"> <input></input> </td>
                        <td className="new-cost-one-item" > <input></input> </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <div className="button-add-new-item">
                    <img src="../images/plus.svg"></img>
                </div>
            </div>
        </div>
    </div>
       
    )
};
export default OneEstimate;