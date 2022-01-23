import React from 'react';
import './_TableOneWallet.scss';
import '../_OneWallet.scss';
import AddNewRowWallet from './AddNewRowWallet/AddNewRowWallet';
import PaginationRows from './PaginationRows/PaginationRows';
import { observer } from 'mobx-react-lite';
import store from '../../../state';
import BodyOneWallet from './BodyOneWallet/BodyOneWallet';
import { WalletRowType } from '../Types';
type TableOneWalletType = {
  listRowsWallet: WalletRowType[];
};
export const TableOneWallet: React.FC<TableOneWalletType> = observer(
  ({ listRowsWallet }) => {
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
          <BodyOneWallet listRowsWallet={listRowsWallet} />
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
        {store.Wallet.numberPagination.length > 1 ? <PaginationRows /> : ''}
        <AddNewRowWallet />
      </div>
    );
  }
);
