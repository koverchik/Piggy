import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import { ButtonInput } from '../../../../components/ButtonInput';
import store from '../../../../state';

import { useTranslation } from 'react-i18next';
import { WrapperModalView } from '../../../../components/WrapperModalView';
import { FieldValuesType, ModalAddNewUserType } from './types';

export const ModalAddNewUser: React.FC<ModalAddNewUserType> = observer(
  ({ setStatePopUp, id, stateUsers }) => {
    const { t } = useTranslation();
    const { register, control, handleSubmit, formState } = useForm({
      defaultValues: {
        access: 'user',
        name: { value: 0, label: '' }
      }
    });

    const onSumbit = ({ name, access }: FieldValuesType): void => {
      store.AddNewUserWallet.requestAddUser(id, name.value, access).then(
        (data) => {
          if (typeof data !== 'string') store.Wallet.allUsers.push(data);
          setStatePopUp((prev) => !prev);
        }
      );
    };
    const bodyContent = (
      <>
        <p>{t('user.add-name-and-status')}</p>
        <div>
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
                  placeholder={t('placeholders.select')}
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
        <ButtonInput />
      </>
    );

    return (
      <WrapperModalView
        setStatePopUp={setStatePopUp}
        handleSubmit={handleSubmit}
        onSumbit={onSumbit}
        title={t('user.find-user')}
        bodyContent={bodyContent}
      />
    );
  }
);
