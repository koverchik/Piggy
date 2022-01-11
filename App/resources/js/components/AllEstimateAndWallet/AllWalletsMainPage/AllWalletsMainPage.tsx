import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import ButtonCreate from '../../ButtonCreate/ButtonCreate';
import './../_AllEstimateAndWallet.scss';
import store from '../../../state';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import PopUp from '../../PopUp/PopUp';
import PaginationInterface from '../../../interfaces/interfacesPagination';
import Pagination from '../../PaginationRows/PaginationRows';
import interfacesPopUp from '../../../interfaces/interfacesPopUp';

const AllWalletsMainPage: React.FC = observer(() => {
  const [listWallet, setlistWallet] = useState([]);
  const [listWalletData, settWalletData] = useState([]);
  const [statePopUp, setStatePopUp] = useState(false);
  const [renderRedirect, setRedirect] = useState(false);

  const buttonName = {
    name: 'Создать',
    type: 'button',
    image: false,
    callbackClick: () => setStatePopUp(true)
  };

  const paginationDataWallet: PaginationInterface = {
    arrayNumber: store.GeneralData.arrayNameAllWallets,
    activeNumber: store.GeneralData.activePaginationAllWallets,
    callbackPaginationArray: store.GeneralData.callbackPaginationArrayW,
    callbackPaginationRight: store.GeneralData.callbackPaginationRightW,
    callbackPaginationLeft: store.GeneralData.callbackPaginationLeftW
  };

  const popUpData: interfacesPopUp = {
    name: store.CreationEditingWallets.newNameWallet,
    kind: 'Создание кошелька',
    textMessage: 'Введите название',
    closeClick: () => setStatePopUp(false),
    button: {
      name: 'Создать',
      type: 'submit',
      image: false,
      callbackClick: store.CreationEditingWallets.createNewWallet,
      redirectPage: redirectPage
    },
    onChangeFunction: store.CreationEditingWallets.onChangeFnWalletName
  };

  function redirectPage(idPage: any) {
    store.Wallet.idWallet = idPage['id'];
    store.Wallet.nameWallet = idPage['name'];
    setRedirect(idPage);
  }

  useEffect(() => {
    store.GeneralData.allWallets().then((data: any) => {
      if (data === 'Error') {
        const noticeError: any = (
          <li key={'listEstimateEmpty'}>
            Упс, что-то пошло не так попробуйте перезагрузить стараницу.
          </li>
        );
        setlistWallet(noticeError);
      } else {
        store.GeneralData.allDataWallets = data;
        settWalletData(data);
        createRowsWallets(data, store.GeneralData.activePaginationAllWallets);
      }
    });
  }, []);

  function createRowsWallets(data: any, pagination: number) {
    const list = data.map((item: any, i: number) => {
      return (
        <li
          key={'listWallet' + i}
          className={
            !(
              (pagination - 1) * 10 < i + 1 &&
              i + 1 <= (pagination - 1) * 10 + 10
            )
              ? 'hide-row'
              : ''
          }
        >
          <Link
            to={
              '/wallet-' +
              item['names_wallets_id'] +
              '-' +
              item['names_wallet']['name']
            }
          >
            {item['names_wallet']['name']}
          </Link>
        </li>
      );
    });
    setlistWallet(list);
  }

  useEffect(() => {
    createRowsWallets(
      listWalletData,
      store.GeneralData.activePaginationAllWallets
    );
  }, [store.GeneralData.activePaginationAllWallets]);

  return (
    <div className="wrapper-wallet">
      {statePopUp ? <PopUp {...popUpData} /> : null}
      <div className="wrapper-block-name-list">
        <p className="header-blok-view">Кошелеки</p>
        <ul className="list-wallet">{listWallet}</ul>
      </div>
      <div className="wrapper-pagination-button-create">
        {store.GeneralData.arrayNameAllWallets.length > 1 ? (
          <Pagination {...paginationDataWallet} />
        ) : (
          ''
        )}
        {renderRedirect ? (
          <Redirect
            to={
              'wallet-' + store.Wallet.idWallet + '-' + store.Wallet.nameWallet
            }
          />
        ) : (
          ''
        )}
        {/* <ButtonCreate {...buttonName} /> */}
      </div>
    </div>
  );
});
export default AllWalletsMainPage;
