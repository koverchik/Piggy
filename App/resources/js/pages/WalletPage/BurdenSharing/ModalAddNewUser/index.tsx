import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import Select from 'react-select';
import { OptionsList } from '..';
import store from '../../../../state';
import './_styles.scss';

type ModalAddNewUser = {
  setStatePopUp: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  stateUsers: OptionsList[] | undefined;
};

export const ModalAddNewUser: React.FC<ModalAddNewUser> = observer(
  ({ setStatePopUp, id, stateUsers }) => {
    const { register, control, handleSubmit, formState } = useForm({
      defaultValues: {
        access: 'user',
        name: ''
      }
    });

    const onSumbit = ({ name, access }: FieldValues): void => {
      store.AddNewUserWallet.requestAddUser(id, name.value, access).then(
        (data) => {
          if (typeof data !== 'string') store.Wallet.allUsers.push(data);
          setStatePopUp((prev) => !prev);
        }
      );
    };

    return (
      <div
        className="wrapper-for-background"
        onClick={() => setStatePopUp((prev) => !prev)}
      >
        <form
          className="wrapper-pop-up"
          onSubmit={handleSubmit(onSumbit)}
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
            <p>Добавьте имя и статус</p>
            <div className="wrapper-for-controller-name">
              <Controller
                name="name"
                rules={{ required: true }}
                control={control}
                render={({ field: { onChange, onBlur } }) => {
                  return (
                    <Select
                      options={stateUsers}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  );
                }}
              />
              <p className="error-input-add-new-user">
                {formState.isSubmitted &&
                  'Мы не смогли добавить пользователя попробуйте еще раз'}
              </p>
            </div>
            <Controller
              name="access"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup aria-label="access" {...field} row>
                  <FormControlLabel
                    value="editor"
                    control={<Radio />}
                    label="Редактор"
                  />
                  <FormControlLabel
                    value="user"
                    control={<Radio />}
                    label="Пользователь"
                  />
                  <FormControlLabel
                    value="owner"
                    control={<Radio />}
                    label="Владелец"
                  />
                </RadioGroup>
              )}
            />
            <div className="wrapper-for-button">
              <input type="submit" value="Добавить" className="button-main" />
            </div>
          </div>
        </form>
      </div>
    );
  }
);
