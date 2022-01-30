import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { AccessList } from '../../../../components/PopUp/AccessList/AccessList';
import { ListForPoints } from '../../../../components/ListForPoint';
import './_styles.scss';
import state from '../../../../state';

type ModalAddNewUser = {
  setStatePopUp: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

export const ModalAddNewUser: React.FC<ModalAddNewUser> = observer(
  ({ setStatePopUp, id }) => {
    const [stateListUser, setStateListUser] = useState(false);
    const [newUser, setNewUser] = useState('');
    const [newUserId, setNewUserId] = useState<number>(0);
    const [accessList, setAccessList] = useState<string>('');

    return (
      <div
        className="wrapper-for-background"
        onClick={() => setStatePopUp(false)}
      >
        <div
          className="wrapper-pop-up"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className="wrapper-header-create-new-name">
            <p>{'Поиск пользователя'} </p>
            <img
              src="../images/cancel_white.svg"
              alt="close"
              className="close-img"
              onClick={() => setStatePopUp(false)}
            />
          </div>
          <div className="wrapper-for-name">
            <p>{'Добавьте имя и статус'}</p>
            <input
              type="text"
              value={newUser}
              onChange={(event) => setNewUser(event.target.value)}
              onClick={() => setStateListUser(!stateListUser)}
            />
            {stateListUser && (
              <ListForPoints
                id={id}
                setNewUser={setNewUser}
                setList={setStateListUser}
                searchData={newUser}
                setNewUserId={setNewUserId}
              />
            )}

            <AccessList setAccessList={setAccessList} />
          </div>
          <div className="wrapper-for-button">
            <div
              className="button-main"
              onClick={() => {
                console.log('click');
                state.AddNewUserWallet.requestAddUser(
                  id,
                  newUserId,
                  accessList
                );

                console.log(id, newUserId, accessList);
              }}
            >
              <img src={'../images/add-user.svg'}></img> Добавить
            </div>
          </div>
        </div>
      </div>
    );
  }
);
