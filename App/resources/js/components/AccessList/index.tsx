import React from 'react';
import { observer } from 'mobx-react-lite';
import './_styles.scss';

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
              console.log(event.currentTarget.value);

              setAccessList(event.currentTarget.value);
            }}
          />
          Владелец
          <input
            name="editor"
            type="radio"
            value="editor"
            className="radio-checkbox"
            onClick={(event) => {
              console.log(event.currentTarget.value);
              setAccessList(event.currentTarget.value);
            }}
          />
          Редактор
          <input
            name="user"
            type="radio"
            value="user"
            className="radio-checkbox"
            onClick={(event) => {
              console.log(event.currentTarget.value);
              setAccessList(event.currentTarget.value);
            }}
          />
          Пользователь
        </div>
      </div>
    );
  }
);
