import React from 'react';
import store from '../../../../state';
import './_AddNewRowWallet.scss';
import { observer } from 'mobx-react-lite';
import AddNewButton from '../../../ButtonAddNewRow/ButtonAddNewRow';

const AddNewRowWallet: React.FC = observer(() => {
  return (
    <form
      onSubmit={(event: React.FormEvent) => {
        store.Wallet.addNewRow();
        store.Wallet.startOneWallet();
        event.preventDefault();
      }}
    >
      <table className="table-add-new-value">
        <tbody>
          <tr>
            <td className="namber-one-item"> {store.Wallet.lengthRows + 1} </td>
            <td className="data-new-one-item">
              <input
                type="date"
                value={store.Wallet.newDataRaw}
                onChange={(event) => {
                  store.Wallet.newDataRaw = event.target.value;
                }}
              ></input>
            </td>
            <td className="new-one-item">
              <input
                type="text"
                value={store.Wallet.newRowWallet}
                onChange={(event) => {
                  store.Wallet.newRowWallet = event.target.value;
                }}
              ></input>
            </td>
            <td className="new-cost-one-item">
              <input
                type="text"
                value={store.Wallet.newRowCost}
                onChange={(event) => {
                  store.Wallet.newRowCost = event.target.value;
                }}
              ></input>
            </td>
            <td className="user-write-item">
              <img src="../images/people.svg"></img>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <AddNewButton />
      </div>
    </form>
  );
});
export default AddNewRowWallet;
