import React from 'react';
import { observer } from 'mobx-react-lite';
import './_AccessList.scss';

const AccessList: React.FC = observer((props: any) => {
  return (
    <div className="access-new-user">
      <div className="access-new-user-wrapper">
        <p>
          <input
            name="access"
            type="radio"
            value="owner"
            className="radio-checkbox"
            onClick={props.callbackClickAccess}
          />
          Владелец
        </p>
        <p>
          <input
            name="access"
            type="radio"
            value="editor"
            className="radio-checkbox"
            onClick={props.callbackClickAccess}
          />
          Редактор
        </p>
        <p>
          <input
            name="access"
            type="radio"
            value="user"
            className="radio-checkbox"
            onClick={props.callbackClickAccess}
          />
          Пользователь
        </p>
      </div>
    </div>
  );
});
export default AccessList;
