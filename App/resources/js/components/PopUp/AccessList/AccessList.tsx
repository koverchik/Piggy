import React from 'react';
import { observer } from 'mobx-react-lite';
import './_AccessList.scss';

export type AccessListType = {
  setAccessList: React.Dispatch<React.SetStateAction<string>>;
};

export const AccessList: React.FC<AccessListType> = observer(
  ({ setAccessList }) => {
    return (
      <div className="access-new-user">
        <div className="access-new-user-wrapper">
          <input
            name="owner"
            type="radio"
            value="owner"
            className="radio-checkbox"
            onClick={(event) => {
              setAccessList(event.currentTarget.value);
            }}
          />
          Владелец
          <input
            name="access"
            type="radio"
            value="editor"
            className="radio-checkbox"
            onClick={(event) => {
              setAccessList(event.currentTarget.value);
            }}
          />
          Редактор
          <input
            name="access"
            type="radio"
            value="user"
            className="radio-checkbox"
            onClick={(event) => {
              setAccessList(event.currentTarget.value);
            }}
          />
          Пользователь
        </div>
      </div>
    );
  }
);
