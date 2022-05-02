import React from 'react';
import './_styles.scss';
import '../_styles.scss';
import { AddNewRowWallet } from './AddNewRowWallet';
import { observer } from 'mobx-react-lite';
import store from '../../../state';
import { BodyOneWallet } from './BodyOneWallet';
import { WalletRowType } from '../types';
import { Pagination } from '../../../components/Pagination';
import { useTranslation } from 'react-i18next';

type TableOneWalletType = {
  listRowsWallet: WalletRowType[];
  activePart: number;
  setActivePart: React.Dispatch<React.SetStateAction<number>>;
  arrayPaginationNumber?: number[];
};

export const TableOneWallet: React.FC<TableOneWalletType> = observer(
  ({ listRowsWallet, activePart, setActivePart, arrayPaginationNumber }) => {
    const { t } = useTranslation();
    return (
      <div className="wrapper-tables-list-add">
        <table className="table-list-value">
          <thead>
            <tr>
              <td className="empty-head-item"> </td>
              <td className="data-head-item">{t('table.date')}</td>
              <td className="name-head-one-item">{t('table.name')}</td>
              <td className="cost-head-one-item">{t('table.cost')} </td>
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
              <td className="title-cost-all-item"> {t('table.result')}: </td>
              <td className="cost-all-item">
                {store.Wallet.allSum.toFixed(2)} {t('table.rubles')}
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
