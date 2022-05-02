import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonAdd } from '../../../components/ButtonAdd';
import store from '../../../state';
import { SharingUserListType } from '../types';
import '../_styles.scss';
import { ModalAddNewUser } from './ModalAddNewUser';
import { TableDebitCredit } from './TableDebitCredit';
import './_styles.scss';

type TypeBurdenSharing = {
  id: string;
};
export type OptionsList = {
  value: number;
  label: string;
};

export const BurdenSharing: React.FC<TypeBurdenSharing> = observer(({ id }) => {
  const [listScopeOneWallet, setListScopeOneWallet] = useState<
    SharingUserListType[]
  >([]);
  const [tableDebitCredit, setTableDebetCredit] = useState(false);
  const [statePopUp, setStatePopUp] = useState(false);
  const [stateUsers, setStateUsers] = useState<OptionsList[]>();
  const { t } = useTranslation();

  useEffect(() => {
    store.Wallet.scopeOneWallet(id).then((data) => {
      if (typeof data !== 'string') {
        setListScopeOneWallet(data);

        if (data.length > 1) setTableDebetCredit(true);
        store.Wallet.allUsers = data;
      }
    });
  }, []);

  useEffect(() => {
    store.AddNewUserWallet.requestUsersSystems(id).then((data) => {
      if (typeof data !== 'string' && data.length > 0) {
        const options = data.map((data) => {
          return { value: data.id, label: data.name };
        });
        setStateUsers(options);
        store.AddNewUserWallet.allDataUsersSystems = data;
      }
    });
  }, [store.Wallet.allUsers]);

  const gradeUser = (item: SharingUserListType) => {
    let grade = '';
    if (item['edit_permission'] === 1 && item['delete_table'] === 1) {
      grade = t('user.owner');
    } else if (item['edit_row'] === 1 && item['delete_row'] === 1) {
      grade = t('user.editor');
    } else {
      grade = t('user.editor');
    }
    return grade;
  };

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
            <td className="head-name-user-table">{t('table.user-name')}</td>
            <td className="head-premission-user-table">{t('table.rank')}</td>
            <td className="head-contribution-user-table">
              {t('table.contribution')}
            </td>
          </tr>
        </thead>
        <tbody>
          {listScopeOneWallet.map((item, i) => {
            return (
              <tr key={'scope-one-wallet' + i}>
                <td className="name-user-table"> {item['user']['name']} </td>
                <td className="premission-user-table">{gradeUser(item)}</td>
                <td className="contribution-user-table">
                  {(100 / listScopeOneWallet.length).toFixed(2)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {stateUsers && (
        <ButtonAdd
          name={t('button.add')}
          srcImage={'../images/add-user.svg'}
          callbackClick={setStatePopUp}
        />
      )}
      {tableDebitCredit && <TableDebitCredit id={id} />}
    </div>
  );
});
