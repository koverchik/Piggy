import React from 'react';
import { observer } from 'mobx-react-lite';
import './_styles.scss';

export type AccessListType = {
  setAccessList: React.Dispatch<React.SetStateAction<string>>;
  register: any;
};

export const AccessList: React.FC<AccessListType> = observer(
  ({ setAccessList, register }) => {
    return (
      <div className="access-new-user-wrapper">
        <input
          {...register('access')}
          type="radio"
          value="owner"
          id="owner-access"
          className="radio-checkbox"
          onClick={(event) => {
            setAccessList(event.currentTarget.value);
          }}
        />
        <label htmlFor="owner-access">Владелец</label>
        <input
          {...register('access')}
          type="radio"
          value="editor"
          id="editor-access"
          className="radio-checkbox"
          onClick={(event) => {
            setAccessList(event.currentTarget.value);
          }}
        />
        <label htmlFor="editor-access">Редактор</label>
        <input
          {...register('access')}
          type="radio"
          value="user"
          id="user-access"
          className="radio-checkbox"
          onClick={(event) => {
            setAccessList(event.currentTarget.value);
          }}
        />
        <label htmlFor="user-access">Пользователь</label>
      </div>
    );
  }
);
