import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import interfacesButtonCreate from "../../../interfaces/interfacesButtonCreate";
import interfacesPopUp from "../../../interfaces/interfacesPopUp";
import store from "../../../state";
import Button from "../../ButtonCreate/ButtonCreate";
import PopUp from "../../PopUp/PopUp";
import "../_OneWallet.scss";
import TableDebitCredit from "./TableDebitCredit/TableDebitCredit";
import "./_BurdenSharing.scss";

const BurdenSharing: React.FC = observer(() => {
    const [listScopeOneWallet, setListScopeOneWallet] = useState([]);
    const [tableDebitCredit, setTableDebetCredit] = useState(false);
    const [statePopUp, setStatePopUp] = useState(false);

    const buttonName: interfacesButtonCreate = {
        name: "Добавить",
        type: "button",
        image: true,
        srcImage: "../images/add-user.svg",
        callbackClick: () => setStatePopUp(true),
    };

    const popUpData: interfacesPopUp = {
        name: store.AddNewUserWallet.newUser,
        kind: "Поиск пользователя",
        textMessage: "Добавьте имя и статус",
        listUser: {
            availability: false,
            callbackClickList: store.AddNewUserWallet.addUser,
        },
        accessList: {
            availability: true,
            callbackClickAccess: (event: Event) => {
                store.AddNewUserWallet.AccessNewUser = (event.target as HTMLInputElement).value;
            },
        },
        closeClick: () => setStatePopUp(false),
        button: {
            name: "Добавить",
            type: "button",
            image: false,
            callbackClick: store.AddNewUserWallet.requestAddUser,
            closeClick: () => setStatePopUp(false),
        },
        onChangeFunction: store.AddNewUserWallet.userSearch,
    };

    useEffect(() => {
        store.Wallet.scopeOneWallet().then((data: any) => {
            store.Wallet.lengthBurdenUser = data.length;
            if (store.Wallet.lengthBurdenUser > 1) {
                setTableDebetCredit(true);
            }
            createListRows(data);
        });
    }, [store.Wallet.lengthBurdenUser]);

    function createListRows(data: any) {
        store.Wallet.allUsers = [];
        const result: any = data.map((item: any, i: number) => {
            store.Wallet.allUsers.push({
                userName: item.user.name,
                userId: item.user.id,
                debitCredit: 0,
            });
            const grade: string = store.Wallet.gradeUser(item);

            return (
                <tr key={"scope-one-wallet" + i}>
                    <td className="name-user-table">
                        {" "}
                        {item["user"]["name"]}{" "}
                    </td>
                    <td className="premission-user-table"> {grade} </td>
                    <td className="contribution-user-table">
                        {" "}
                        {(100 / store.Wallet.lengthBurdenUser).toFixed(2)}%
                    </td>
                </tr>
            );
        });
        setListScopeOneWallet(result);
    }

    return (
        <div className="wrapper-user-table">
            {statePopUp ? <PopUp {...popUpData} /> : ""}
            <table className="table-user">
                <thead>
                    <tr>
                        <td className="head-name-user-table"> Имя </td>
                        <td className="head-premission-user-table"> Права </td>
                        <td className="head-contribution-user-table">
                            {" "}
                            Вклад{" "}
                        </td>
                    </tr>
                </thead>
                <tbody>{listScopeOneWallet}</tbody>
            </table>
            <Button {...buttonName} />
            {tableDebitCredit ? <TableDebitCredit /> : ""}
        </div>
    );
});
export default BurdenSharing;
