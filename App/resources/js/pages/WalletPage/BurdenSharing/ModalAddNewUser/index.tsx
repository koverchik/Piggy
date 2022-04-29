import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import Select from 'react-select';
import { OptionsList } from '..';
import { Button } from '../../../../components/Button';
import store from '../../../../state';
import './_styles.scss';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
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
            <p>{t('user.find-user')}</p>
            <img
              src="../images/cancel_white.svg"
              alt="close"
              className="close-img"
              onClick={() => setStatePopUp(false)}
            />
          </div>
          <div className="wrapper-for-name">
            <p>{t('user.add-name-and-status')}</p>
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
                    label={t('user.editor')}
                  />
                  <FormControlLabel
                    value="user"
                    control={<Radio />}
                    label={t('user.user')}
                  />
                  <FormControlLabel
                    value="owner"
                    control={<Radio />}
                    label={t('user.owner')}
                  />
                </RadioGroup>
              )}
            />
            <Button />
          </div>
        </form>
      </div>
    );
  }
);
