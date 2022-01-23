import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import store from '../../../state/index';

const BodyTableEstimate: React.FC = observer((props: any) => {
  const [listRowsEstimate, setlistRowsEstimate] = useState([]);

  useEffect(() => {
    createList(store.Estimate.dataRows, store.Estimate.activePagination);
  }, [store.Estimate.activePagination]);

  useEffect(() => {
    store.Estimate.requestOneEstimate().then((data: any) => {
      if (data === 'Error') {
        const list: any = (
          <tr key={'RowEstimate'} className="error-table">
            <td colSpan={4}>
              Упс... Что-то пошло не так, попробуйте перезагрузить страницу
            </td>
          </tr>
        );
        setlistRowsEstimate(list);
      } else {
        store.Estimate.dataRows = data;
        const lengthData: number = store.Estimate.pagination.length;
        store.Estimate.activePagination = store.Estimate.pagination.length;
        if (data.length === 0) {
          const list: any = (
            <tr key={'RowEstimate'} className="error-table">
              <td colSpan={4}>
                Здесь пока ничего нет, попробуйте добавить несколько строк
              </td>
            </tr>
          );
          setlistRowsEstimate(list);
        } else {
          createList(data, lengthData);
        }
      }
    });
  }, [store.Estimate.sumRows]);

  function createList(data: any, pagination: number) {
    const list: any = data.map((item: any, i: number) => {
      return (
        <tr
          key={'RowEstimate' + i}
          className={
            !(
              (pagination - 1) * 10 < i + 1 &&
              i + 1 <= (pagination - 1) * 10 + 10
            )
              ? 'display-none'
              : ''
          }
        >
          <td className="namber-one-item"> {i + 1} </td>
          <td className="name-one-item"> {item['name']} </td>
          <td className="cost-one-item"> {item['amount']} руб </td>
          <td className="namber-one-item trash-image">
            <img
              src="../images/delete-one-peope.svg"
              id-data={item['id']}
              onClick={(e: any) =>
                store.Estimate.deleteRow(e.target.getAttribute('id-data'))
              }
            />
          </td>
        </tr>
      );
    });
    setlistRowsEstimate(list);
  }

  return <tbody>{listRowsEstimate}</tbody>;
});
export default BodyTableEstimate;
