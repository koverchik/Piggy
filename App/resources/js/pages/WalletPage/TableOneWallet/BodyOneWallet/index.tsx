import { observer } from 'mobx-react-lite';
import React from 'react';
import { ErrorTableLoading } from '../../../../components/ErrorTableLoading';
import store from '../../../../state';
import { WalletRowType } from '../../Types';

type TableOneWallet = {
  listRowsWallet: WalletRowType[] | string;
  pagination: number;
};

export const BodyOneWallet: React.FC<TableOneWallet> = observer(
  ({ listRowsWallet, pagination }) => {
    return (
      <tbody>
        {typeof listRowsWallet === 'string' ? (
          <ErrorTableLoading colSpan={5} />
        ) : (
          listRowsWallet.map((item: any, i: number) => {
            const dataOneRow = new Date(item['created_at_time']);
            return (
              <tr
                key={'row-wallet-' + i}
                className={
                  !(
                    (pagination - 1) * 10 < i + 1 &&
                    i + 1 <= (pagination - 1) * 10 + 10
                  )
                    ? 'hide-row'
                    : ''
                }
              >
                <td className="namber-one-item"> {i + 1} </td>
                <td className="data-item">{`${store.Wallet.addZero(
                  dataOneRow.getDate()
                )}.${store.Wallet.addZero(
                  dataOneRow.getMonth() + 1
                )}.${dataOneRow.getFullYear()}`}</td>
                <td className="name-one-item"> {item['name']} </td>
                <td className="cost-one-item"> {item['amount']} руб </td>
                <td className="user-write-item">
                  <img
                    src="../images/people.svg"
                    alt="icon-user"
                    title={item.autor.name}
                  ></img>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    );
  }
);
