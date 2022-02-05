import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { AccessList } from '../../../../components/AccessList';
import { ListForPoints } from '../../../../components/ListForPoint';
import './_styles.scss';
import state from '../../../../state';
import { useForm } from 'react-hook-form';

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
    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm();

    const onSumbit = () => {
      state.AddNewUserWallet.requestAddUser(id, newUserId, accessList);
      setStatePopUp(false);
    };
    return (
      <div
        className="wrapper-for-background"
        onClick={(event) => {
          // setStatePopUp(false);
          // event.stopPropagation();
        }}
      >
        <form className="wrapper-pop-up" onClick={handleSubmit(onSumbit)}>
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
            <input type="submit" value="Добавить" className="button-main" />
          </div>
        </form>
      </div>
    );
  }
);
