import React from 'react';
import './_styles.scss';
import '../_styles.scss';
import { AddNewRowWallet } from './AddNewRowWallet';
import { observer } from 'mobx-react-lite';
import store from '../../../state';
import { BodyOneWallet } from './BodyOneWallet';
import { WalletRowType } from '../types';
import { Pagination } from '../../../components/Pagination';

type TableOneWalletType = {
  listRowsWallet: WalletRowType[];
  activePart: number;
  setActivePart: React.Dispatch<React.SetStateAction<number>>;
  arrayPaginationNumber?: number[];
};

export const TableOneWallet: React.FC<TableOneWalletType> = observer(
  ({ listRowsWallet, activePart, setActivePart, arrayPaginationNumber }) => {
    return (
      <div className="wrapper-tables-list-add">
        <table className="table-list-value">
          <thead>
            <tr>
              <td className="empty-head-item"> </td>
              <td className="data-head-item">Дата</td>
              <td className="name-head-one-item">Название</td>
              <td className="cost-head-one-item"> Стоимость </td>
              <td className="empty-head-item-user"> </td>
            </tr>
          </thead>
          <BodyOneWallet
            listRowsWallet={listRowsWallet}
            pagination={activePart}
          />
          <tfoot>
            <tr>
              <td className="empty-item" colSpan={2}></td>
              <td className="title-cost-all-item"> Итого: </td>
              <td className="cost-all-item">
                {store.Wallet.allSum.toFixed(2)} руб
              </td>
            </tr>
          </tfoot>
        </table>
        {arrayPaginationNumber && arrayPaginationNumber.length > 1 && (
          <Pagination
            activePart={activePart}
            setActivePart={setActivePart}
            arrayPaginationNumber={arrayPaginationNumber}
          />
        )}
        <AddNewRowWallet />
      </div>
    );
  }
);
