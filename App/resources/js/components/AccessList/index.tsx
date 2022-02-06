import React from 'react';
import { observer } from 'mobx-react-lite';
import './_styles.scss';

export type AccessListType = {
  setAccessList: React.Dispatch<React.SetStateAction<string>>;
};

export const AccessList: React.FC<AccessListType> = observer(
  ({ setAccessList }) => {
    return (
      <div className="access-new-user-wrapper">
        <input
          name="access"
          type="radio"
          value="owner"
          id="owner-access"
          className="radio-checkbox"
          onClick={(event) => {
            console.log(event.currentTarget.value);
            setAccessList(event.currentTarget.value);
          }}
        />
        <label htmlFor="owner-access">Владелец</label>
        <input
          name="access"
          type="radio"
          value="editor"
          id="editor-access"
          className="radio-checkbox"
          onClick={(event) => {
            console.log(event.currentTarget.value);
            setAccessList(event.currentTarget.value);
          }}
        />
        <label htmlFor="editor-access">Редактор</label>
        <input
          name="access"
          type="radio"
          value="user"
          id="user-access"
          className="radio-checkbox"
          onClick={(event) => {
            console.log(event.currentTarget.value);
            setAccessList(event.currentTarget.value);
          }}
        />
        <label htmlFor="user-access">Пользователь</label>
      </div>
    );
  }
);
