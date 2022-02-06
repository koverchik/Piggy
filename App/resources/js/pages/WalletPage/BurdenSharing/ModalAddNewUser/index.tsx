import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AccessList } from '../../../../components/AccessList';
import { ListForPoints, UserList } from '../../../../components/ListForPoint';
import state from '../../../../state';
import './_styles.scss';

type ModalAddNewUser = {
  setStatePopUp: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  stateUsers: UserList[] | undefined;
};

export const ModalAddNewUser: React.FC<ModalAddNewUser> = observer(
  ({ setStatePopUp, id, stateUsers }) => {
    const [stateListUser, setStateListUser] = useState(false);
    const [newUser, setNewUser] = useState('');
    const [newUserId, setNewUserId] = useState<number>(0);
    const [accessList, setAccessList] = useState<string>('');

    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm();

    const onSumbit = () => {
      state.AddNewUserWallet.requestAddUser(id, newUserId, accessList);
      setStatePopUp(false);
      console.log(id, newUserId, accessList);
    };
    return (
      <div
        className="wrapper-for-background"
        onClick={(event) => {
          // setStatePopUp(false);
          // event.stopPropagation();
        }}
      >
        <form className="wrapper-pop-up" onSubmit={handleSubmit(onSumbit)}>
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
            <p>Добавьте имя и статус</p>
            <div>
              <input
                type="text"
                value={newUser}
                {...register('text', { required: true })}
                onChange={(event) => setNewUser(event.target.value)}
                onClick={() => setStateListUser(!stateListUser)}
              />
              <p className="error-input-add-new-user">
                {errors.text?.type === 'required' &&
                  'Веберите пользователя из списка'}
              </p>
              {stateListUser && (
                <ListForPoints
                  setNewUser={setNewUser}
                  setList={setStateListUser}
                  searchData={newUser}
                  setNewUserId={setNewUserId}
                  stateUsers={stateUsers}
                />
              )}
            </div>
            <AccessList setAccessList={setAccessList} />
          </div>
          <div className="wrapper-for-button">
            <input type="submit" value="Добавить" className="button-main" />
          </div>
        </form>
      </div>
    );
  }
);
