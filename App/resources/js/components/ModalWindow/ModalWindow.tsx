import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './_ModalWindow.scss';

type ModalWindow = {
  statePopUp: React.Dispatch<React.SetStateAction<boolean>>;
  nameModal: string;
  fnAddNewItem: (newName: string) => Promise<any>;
  pathName: string;
};

export const ModalWindow: React.FC<ModalWindow> = observer(
  ({ nameModal, statePopUp, fnAddNewItem, pathName }) => {
    const [newName, setNewName] = useState('');
    const history = useHistory();
    return (
      <div className="wrapper-for-background" onClick={() => statePopUp(false)}>
        <div
          className="wrapper-pop-up"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className="wrapper-header-create-new-name">
            <p>{'Создание ' + nameModal.toLowerCase()} </p>
            <img
              src="../images/cancel_white.svg"
              alt="close"
              className="close-img"
              onClick={() => statePopUp(false)}
            />
          </div>
          <div className="wrapper-for-name">
            <p>{'Придумайте название ' + nameModal.toLowerCase()}</p>
            <input
              type="text"
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
            />
          </div>
          <div className="wrapper-for-button">
            <div
              className="button-main"
              onClick={() => {
                fnAddNewItem(newName).then((result) => {
                  if (Error !== result) history.push(pathName + '-' + result);
                });
              }}
            >
              Создать
            </div>
          </div>
        </div>
      </div>
    );
  }
);
