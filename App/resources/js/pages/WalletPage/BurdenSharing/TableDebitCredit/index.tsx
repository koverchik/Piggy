import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import store from '../../../../state';
import { DebitCreditTableType } from '../../../../state/StateTypes';
import './_styles.scss';

type TableDebitCreditType = {
  id: string;
};

export const TableDebitCredit: React.FC<TableDebitCreditType> = observer(
  ({ id }) => {
    const [listTableDebitCredit, setTableDebetCredit] = useState<
      DebitCreditTableType[]
    >([]);

    useEffect(() => {
      store.Wallet.debitCreditTable(id).then((data) => {
        console.log(data);
        if (typeof data !== 'string') {
          setTableDebetCredit(data);
        }
      });
    }, []);

    return (
      <table className="table-debit-credit">
        <thead>
          <tr>
            <td className="empty-name-user-head-debit-credit"> </td>
            <td className="column-head-debit"> Дебет </td>
            <td className="second-side-user-head-debit-credit">Кредит</td>
          </tr>
        </thead>
        <tbody>
          {listTableDebitCredit.map((data, i) => {
            console.log(data);
            return (
              <tr key={'table-debit-credit' + i}>
                <td className="name-user-debit-credit">{data.name}</td>
                <td className="column-debit">
                  {data.debit > 0 ? data.debit.toFixed(2) + ' руб' : 0 + ' руб'}
                </td>
                <td className="column-credit">
                  {data.credit > 0
                    ? data.credit.toFixed(2) + ' руб'
                    : 0 + ' руб'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
);
