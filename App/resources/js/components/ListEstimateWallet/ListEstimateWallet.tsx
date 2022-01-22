import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import './_AllEstimateAndWallet.scss';

interface ListEstimateWalletType {
  nameSection: string;
  patch: string;
  listData?: [];
  fnAddNewItem: (newName: string) => Promise<number>;
}

export const ListEstimateWallet: React.FC<ListEstimateWalletType> = observer(
  ({ listData, nameSection, patch, fnAddNewItem }) => {
    const [statePopUp, setStatePopUp] = useState(false);

    return (
      <div className="wrapper">
        <div className="wrapper-block-name-list">
          <p className="header-blok-view">{nameSection}</p>
          <ul className="list">
            {listData &&
              listData.map((item) => {
                return (
                  <li key={item['id']}>
                    <Link to={'/' + patch + '-' + item['names_estimates_id']}>
                      {item['full_name']}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="wrapper-pagination-button-create">
          <div
            className="button-create"
            onClick={() => {
              setStatePopUp(true);
            }}
          >
            Создать
          </div>
        </div>
        {statePopUp && (
          <ModalWindow
            statePopUp={setStatePopUp}
            nameModal={nameSection}
            fnAddNewItem={fnAddNewItem}
            pathName={patch}
          />
        )}
      </div>
    );
  }
);
