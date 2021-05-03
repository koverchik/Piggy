import React from "react";
import './_EditOneEstimate.scss';
import'./../_OneEstimate.scss';


const EditOneEstimate: React.FC = () => {
    return (
    <div className="wrapper-one-estimate">
        <div className="one-estimate">
            <div className="wrapper-header-one-estimate">
                <h2 className="header-one-estimate"> Название </h2>
            </div>
            <table className="table-list-value">
                <thead>
                    <tr>
                        <td className="empty-head-item">  </td>
                        <td className="name-head-one-item">Название</td>
                        <td className="name-head-one-item"> Стоимость </td>
                        <td className="cost-head-one-item"></td>
                    </tr>
                </thead>
                <tbody> 
                    <tr>    
                        <td className="namber-one-item"> 1</td>
                        <td className="name-head-one-item"><input value="Сок"></input></td>
                        <td className="cost-head-one-item"><input value="3"></input>  </td>
                        <td className="namber-one-item trash-image"><img src="../images/delete-one-peope.svg"/></td>
                    </tr>
                    <tr>    
                        <td className="namber-one-item"> 2</td>
                        <td className="name-head-one-item"><input value="Машина"></input></td>
                        <td className="cost-head-one-item"><input value="120"></input></td>
                       
                    </tr>
                </tbody>
                <tfoot>
                   <tr>
                        <td></td>
                        <td className="title-cost-all-item" colSpan={2}> Итого: </td>
                        <td className="cost-all-item"> 3 руб </td>
                        <td className="empty-item">  </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
    )
};
export default EditOneEstimate;