import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createArrayPagination } from '../../components/Helpers/ArrayPagination';
import store from '../../state';
import BurdenSharing from './BurdenSharing/BurdenSharing';
import { TableOneWallet } from './TableOneWallet';
import { AllDataWalletType, WalletRowType } from './Types';
import './_styles.scss';

type useParamsIdType = {
  id: string;
};

export const OneWallet: React.FC = observer(() => {
  const [listRowsWallet, setListRowsWallet] = useState<WalletRowType[]>();
  const [nameWallet, setNameWallet] = useState<string>();
  const [activePart, setActivePart] = useState(1);
  const [arrayPaginationNumber, setArrayPaginationNumber] = useState<
    number[]
    >();
  
  const { id } = useParams<useParamsIdType>();

  useEffect(() => {
    store.Wallet.startOneWallet(id).then((data: AllDataWalletType | string) => {
      if (typeof data !== 'string') {
        setListRowsWallet(data.rows);
        setNameWallet(data.name);
        setArrayPaginationNumber(createArrayPagination(data.rows));
      }
    });
  }, []);

  return (
    <div className="wrapper-one-wallet">
      <div className="one-wallet">
        <div className="wrapper-header-one-wallet">
          <h2 className="header-one-wallet">{nameWallet}</h2>
          <div className="wrapper-button-edit-one-wallet">
            <img src="../images/pensil.svg"></img>
          </div>
        </div>
        <div className="wrapper-table-wallet">
          {listRowsWallet && (
            <TableOneWallet
              listRowsWallet={listRowsWallet}
              activePart={activePart}
              setActivePart={setActivePart}
              arrayPaginationNumber={arrayPaginationNumber}
            />
          )}
          <BurdenSharing />
        </div>
      </div>
    </div>
  );
});
