import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import store from '../../state';
import BurdenSharing from './BurdenSharing/BurdenSharing';
import { TableOneWallet } from './TableOneWallet/TableOneWallet';
import './_OneWallet.scss';
type useParamsIdType = {
  id: string;
};
const OneWallet: React.FC = observer(() => {
  const [listRowsWallet, setListRowsWallet] = useState();
  const { id } = useParams<useParamsIdType>();

  useEffect(() => {
    store.Wallet.startOneWallet(id).then((data: any) => {
      console.log('data', data);

      setListRowsWallet(data.rows);
    });
  }, []);

  return (
    <div className="wrapper-one-wallet">
      <div className="one-wallet">
        <div className="wrapper-header-one-wallet">
          <h2 className="header-one-wallet">{store.Wallet.nameWallet}</h2>
          <div className="wrapper-button-edit-one-wallet">
            <img src="../images/pensil.svg"></img>
          </div>
        </div>
        <div className="wrapper-table-wallet">
          <TableOneWallet listRowsWallet={listRowsWallet} />
          <BurdenSharing />
        </div>
      </div>
    </div>
  );
});
export default OneWallet;
