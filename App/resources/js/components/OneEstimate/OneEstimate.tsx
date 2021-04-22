import React, { useEffect, useState } from "react";
import './_OneEstimate.scss';
import axios from 'axios';

const OneEstimate: React.FC = (props : any) => {

    const [idEstimate, setIdEstimate] = useState([props.match.params.id]);
    const [nameEstimate, setNameEstimate] = useState();
    const [listRowsEstimate, setlistRowsEstimate] = useState();
    const [SummRowsEstimate, setSummRowsEstimate] = useState(0);

    useEffect(() => {
        
        axios.post('http://localhost:8000/one-estimates', {id: idEstimate } ).then(response => {
            setNameEstimate(response.data[0].name);

            const sum = response.data.rows.reduce(function(sum: number, elem: any) {
                return sum + elem.amount;
            }, 0);

            setSummRowsEstimate(sum);
   
           let listRows = response.data.rows.map(( item: any, i: number ) =>{
        
            
            return ( <tr key={"RowEstimate"+i}>
                        <td className="namber-one-item"> {i + 1 } </td>
                        <td className="name-one-item" > {item.name} </td>
                        <td className="cost-one-item"> {item.amount} руб </td>
                    </tr>)
              })
              setlistRowsEstimate(listRows);   
 
            },
            response => {
                console.log("error request " + response);
                let notiseError : any = ( <tr>
                                            <td> Упс, что-то пошло не так, попробуйте перезагрузить стараницу </td>
                                        </tr>)
                setlistRowsEstimate(notiseError);
                })
    }, []);
    

    return (
    <div className="wrapper-one-estimate">
        <div className="one-estimate">
            <div className="wrapper-header-one-estimate">
                <h2 className="header-one-estimate">{ nameEstimate }</h2>
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
                   { listRowsEstimate }
                </tbody>
                <tfoot>
                <tr>
                        <td className="empty-item">  </td>
                        <td className="title-cost-all-item"> Итого:  </td>
                        <td className="cost-all-item"> { SummRowsEstimate } руб </td>
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