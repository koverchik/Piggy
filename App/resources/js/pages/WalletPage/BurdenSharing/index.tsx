import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { ButtonAdd } from '../../../components/ButtonAdd';
import { UserList } from '../../../components/ListForPoint';
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
  const [stateUsers, setStateUsers] = useState<UserList[]>();

  useEffect(() => {
    store.Wallet.scopeOneWallet(id).then((data) => {
      if (typeof data !== 'string') {
        setListScopeOneWallet(data);

        if (data.length > 1) setTableDebetCredit(true);
        store.Wallet.allUsers = data;
        console.log(data);
      }
    });
  }, []);

  useEffect(() => {
    store.AddNewUserWallet.requestUsersSystems(id).then((data) => {
      if (typeof data !== 'string' && data.length > 0) {
        setStateUsers(data);
        store.AddNewUserWallet.allDataUsersSystems = data;
      }
    });
  }, [store.Wallet.allUsers]);

  return (
    <div className="wrapper-user-table">
      {statePopUp && (
        <ModalAddNewUser
          setStatePopUp={setStatePopUp}
          id={id}
          stateUsers={stateUsers}
        />
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
      <ButtonAdd
        name={'Добавить'}
        srcImage={'../images/add-user.svg'}
        callbackClick={setStatePopUp}
      />
      {tableDebitCredit && <TableDebitCredit id={id} />}
    </div>
  );
});
