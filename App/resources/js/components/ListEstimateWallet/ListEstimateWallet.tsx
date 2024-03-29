import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ResponseListNamesEstimateWallet } from '../../state/StateTypes';
import { createArrayPagination } from '../Helpers/ArrayPagination';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { Pagination } from '../Pagination';
import './_AllEstimateAndWallet.scss';

interface ListEstimateWalletType {
  nameSection: string;
  patch: string;
  listData?: ResponseListNamesEstimateWallet[];
  fnAddNewItem: (newName: string) => Promise<number>;
}

export const ListEstimateWallet: React.FC<ListEstimateWalletType> = observer(
  ({ listData, nameSection, patch, fnAddNewItem }) => {
    const { t } = useTranslation();
    const [statePopUp, setStatePopUp] = useState(false);
    const [arrayPaginationNumber, setArrayPaginationNumber] = useState<
      number[]
    >();
    const [activePart, setActivePart] = useState<number>(1);

    useEffect(() => {
      if (listData?.length) {
        setArrayPaginationNumber(createArrayPagination(listData));
      }
    }, [listData]);

    return (
      <div className="wrapper">
        <div className="wrapper-block-name-list">
          <p className="header-blok-view">{nameSection}</p>
          <ul className="list">
            {listData &&
              listData.map((item, i) => {
                return (
                  <li
                    key={item['name'] + item['id']}
                    className={
                      !(
                        (activePart - 1) * 10 < i + 1 &&
                        i + 1 <= (activePart - 1) * 10 + 10
                      )
                        ? 'hide-row'
                        : ''
                    }
                  >
                    <Link to={'/' + patch + '-' + item['id']}>
                      {item['name']}
                    </Link>
                  </li>
                );
              })}
          </ul>
          {arrayPaginationNumber && listData && listData?.length > 10 && (
            <Pagination
              arrayPaginationNumber={arrayPaginationNumber}
              activePart={activePart}
              setActivePart={setActivePart}
            />
          )}
        </div>
        <div className="wrapper-pagination-button-create">
          <div
            className="button-create"
            onClick={() => {
              setStatePopUp(true);
            }}
          >
            {t('button.create')}
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
