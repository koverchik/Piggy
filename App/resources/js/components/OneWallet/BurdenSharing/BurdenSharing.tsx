import React, { useEffect, useState } from "react";
import './_BurdenSharing.scss';
import "../_OneWallet.scss";
import store from "../../../state";
import { observer } from "mobx-react-lite";
import TableDebetCredit from "./TableDebetCredit/TableDebetCredit";
import interfacesButtonCreate from "../../../interfaces/intefacesButtonCreate";
import Button from "../../ButtonCreate/ButtonCreate";
import PopUp from "../../PopUp/PopUp";
import interfacesPopUp from "../../../interfaces/interfacesPopUp";

const BurdenSharing: React.FC = observer(() => {
    const [listScopeOneWallet, setListScopeOneWallet] = useState([]);
    const [tableDebetCredit, setTableDebetCredit] = useState(false);
    const [statePopUp, setStatePopUp] = useState(false);
    

    const buttonName: interfacesButtonCreate = { 
    name: "Добавить",
    type: "button",
    image: true,
    srcImage:"../images/add-user.svg",
    callbackClick:( ) => setStatePopUp(true),
    }; 

    const popUpData: interfacesPopUp = {
        name: store.Wallet.newUser,
        kind: "Поиск пользователя",
        textMessage: "Добавьте имя и статус",
        listUser: {
            availability: false,    
        },
        accessOptions: true,
        closeClick: () => setStatePopUp(false),
        button: {name: "Добавить",
                type: "button",
                image: false,
                callbackClick: store.Wallet.addUser,
                },
        onChangeFunction: store.Wallet.userSearch,
    }  

    useEffect(() => {       
        store.Wallet.scopeOneWallet().then((data: any) => {
            store.Wallet.lengthBurdenUser = data.length;
            if(store.Wallet.lengthBurdenUser > 1){setTableDebetCredit(true)}
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
        {statePopUp ? <PopUp {...popUpData}/> : ""}
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
        <Button {... buttonName }/>
        {tableDebetCredit ? <TableDebetCredit/>: ''}
    </div>      
    )
});
export default BurdenSharing;