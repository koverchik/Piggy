import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import store from '../../../../state';

const TableOneWallet: React.FC = observer(() => {
  const [listRowsWallet, setListRowsWallet] = useState();

  useEffect(() => {
    store.Wallet.startOneWallet().then((data: any) => {
      if (data === 'Error') {
        const messageError: any = (
          <tr className="error-one-walet">
            <td colSpan={5}>
              Что-то пошло не так, попробуйте перезагрузить страницу
            </td>
          </tr>
        );
        setListRowsWallet(messageError);
      } else {
        store.Wallet.allRows = data.data.rows;
        store.Wallet.lengthRows = data.data.rows.length;
        store.Wallet.activePagination = store.Wallet.numberPagination.length;
        if (data.data.rows.length === 0) {
          const warning: any = (
            <tr key="row-wallet-0" className="error-one-walet">
              <td colSpan={5}>
                Здесь пока ничего нет, попробуйте добавить несколько строк
              </td>
            </tr>
          );
          setListRowsWallet(warning);
        } else {
          createListRows(data.data.rows, store.Wallet.activePagination);
        }
      }
    });
  }, [store.Wallet.allSum, store.Wallet.lengthBurdenUser]);

  useEffect(() => {
    createListRows(store.Wallet.allRows, store.Wallet.activePagination);
  }, [store.Wallet.activePagination]);

  function createListRows(data: any, pagination: number) {
    const result: any = data.map((item: any, i: number) => {
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
    });
    setListRowsWallet(result);
  }
  return <tbody>{listRowsWallet}</tbody>;
});
export default TableOneWallet;
