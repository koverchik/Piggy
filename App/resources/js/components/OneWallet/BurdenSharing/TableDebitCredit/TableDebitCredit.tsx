import React, { useEffect, useState } from "react";
import "./_TableDebitCredit.scss";
import store from "../../../../state";
import { observer } from "mobx-react-lite";

const TableDebitCredit: React.FC = observer(() => {
    const [listTableDebitCredit, setTableDebetCredit] = useState();

    useEffect(() => {
        if (
            store.Wallet.allRows.length != 0 &&
            store.Wallet.allUsers.length != 0
        ) {
            store.Wallet.allRows.map((item: any) => {
                for (
                    let index = 0;
                    index < store.Wallet.allUsers.length;
                    index++
                ) {
                    if (store.Wallet.allUsers[index].userId == item.user_id) {
                        store.Wallet.allUsers[index].debitCredit =
                            store.Wallet.allUsers[index].debitCredit +
                            (item.amount -
                                item.amount / store.Wallet.lengthBurdenUser);
                    } else {
                        store.Wallet.allUsers[index].debitCredit =
                            store.Wallet.allUsers[index].debitCredit -
                            item.amount / store.Wallet.lengthBurdenUser;
                    }
                }
            });
            createRowsDebitCredit(store.Wallet.allUsers);
        }
    }, [
        store.Wallet.lengthRows,
        store.Wallet.lengthBurdenUser,
        store.Wallet.allUsers,
    ]);

    function createRowsDebitCredit(data: any) {
        const resultListTableDebitCredit = data.map(
            (itemDebitCredit: any, i: number) => {
                let debit = 0;
                let credit = 0;
                if (itemDebitCredit.debitCredit < 0) {
                    debit = 0;
                    credit = Math.abs(itemDebitCredit.debitCredit);
                } else {
                    debit = itemDebitCredit.debitCredit;
                    credit = 0;
                }

                return (
                    <tr key={"table-debit-credit" + i}>
                        <td className="name-user-debit-credit">
                            {" "}
                            {itemDebitCredit.userName}{" "}
                        </td>
                        <td className="column-debit">
                            {" "}
                            {debit.toFixed(2)} руб{" "}
                        </td>
                        <td className="column-credit">
                            {" "}
                            {credit.toFixed(2)} руб{" "}
                        </td>
                    </tr>
                );
            }
        );
        setTableDebetCredit(resultListTableDebitCredit);
    }

    return (
        <table className="table-debit-credit">
            <thead>
                <tr>
                    <td className="empty-name-user-head-debit-credit"> </td>
                    <td className="column-head-debit"> Дебет </td>
                    <td className="second-side-user-head-debit-credit">
                        {" "}
                        Кредит{" "}
                    </td>
                </tr>
            </thead>
            <tbody>{listTableDebitCredit}</tbody>
        </table>
    );
});
export default TableDebitCredit;
