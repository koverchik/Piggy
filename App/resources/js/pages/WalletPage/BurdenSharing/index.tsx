import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import Button from '../../../components/ButtonCreate/ButtonCreate';
import interfacesButtonCreate from '../../../interfaces/interfacesButtonCreate';
import interfacesPopUp from '../../../interfaces/interfacesPopUp';
import store from '../../../state';
import { SharingUserListType } from '../types';
import '../_styles.scss';
import { ModalAddNewUser } from './ModalAddNewUser';
import { TableDebitCredit } from './TableDebitCredit';
import './_styles.scss';

type TypeBurdenSharing = {
  id: string;
};

export const BurdenSharing: React.FC<TypeBurdenSharing> = observer(({ id }) => {
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
      {statePopUp && (
        <ModalAddNewUser {...popUpData} setStatePopUp={setStatePopUp} id={id} />
      )}
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
      {tableDebitCredit && <TableDebitCredit id={id} />}
    </div>
  );
});
