import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import interfacesButtonCreate from '../../../interfaces/interfacesButtonCreate';
import interfacesPopUp from '../../../interfaces/interfacesPopUp';
import store from '../../../state';
import Button from '../../../components/ButtonCreate/ButtonCreate';
import PopUp from '../../../components/PopUp/PopUp';
import '../_styles.scss';
import TableDebitCredit from './TableDebitCredit/TableDebitCredit';
import './_BurdenSharing.scss';
import { SharingUserListType, WalletRowType } from '../types';

type TypeBurdenSharing = {
  id: string;
  listRowsWallet: WalletRowType[];
};

const BurdenSharing: React.FC<TypeBurdenSharing> = observer(
  ({ id, listRowsWallet }) => {
    const [listScopeOneWallet, setListScopeOneWallet] = useState<
      SharingUserListType[]
    >([]);
    const [tableDebitCredit, setTableDebetCredit] = useState(false);
    const [statePopUp, setStatePopUp] = useState(false);

    const buttonName: interfacesButtonCreate = {
      name: 'Добавить',
      type: 'button',
      image: true,
      srcImage: '../images/add-user.svg',
      callbackClick: () => setStatePopUp(true)
    };

    const popUpData: interfacesPopUp = {
      name: store.AddNewUserWallet.newUser,
      kind: 'Поиск пользователя',
      textMessage: 'Добавьте имя и статус',
      listUser: {
        availability: false,
        callbackClickList: store.AddNewUserWallet.addUser
      },
      accessList: {
        availability: true,
        callbackClickAccess: (event: Event) => {
          store.AddNewUserWallet.AccessNewUser = (event.target as HTMLInputElement).value;
        }
      },
      closeClick: () => setStatePopUp(false),
      button: {
        name: 'Добавить',
        type: 'button',
        image: false,
        callbackClick: store.AddNewUserWallet.requestAddUser,
        closeClick: () => setStatePopUp(false)
      },
      onChangeFunction: store.AddNewUserWallet.userSearch
    };

    useEffect(() => {
      store.Wallet.scopeOneWallet(id).then((data) => {
        if (typeof data !== 'string') {
          setListScopeOneWallet(data);
          if (data.length > 1) setTableDebetCredit(true);
        }
      });
    }, []);

    return (
      <div className="wrapper-user-table">
        {statePopUp ? <PopUp {...popUpData} /> : ''}
        <table className="table-user">
          <thead>
            <tr>
              <td className="head-name-user-table"> Имя </td>
              <td className="head-premission-user-table"> Права </td>
              <td className="head-contribution-user-table"> Вклад </td>
            </tr>
          </thead>
          <tbody>
            {listScopeOneWallet.map((item, i) => {
              return (
                <tr key={'scope-one-wallet' + i}>
                  <td className="name-user-table"> {item['user']['name']} </td>
                  <td className="premission-user-table">
                    {store.Wallet.gradeUser(item)}
                  </td>
                  <td className="contribution-user-table">
                    {(100 / listScopeOneWallet.length).toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Button {...buttonName} />
        {tableDebitCredit && (
          <TableDebitCredit listRowsWallet={listRowsWallet} />
        )}
      </div>
    );
  }
);
export default BurdenSharing;
