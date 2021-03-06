import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../../ButtonCreate/ButtonCreate';
import './../_AllEstimateAndWallet.scss';
import store from '../../../state';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import interfacesButtonCreate from '../../../interfaces/intefacesButtonCreate';
import PaginationInterface from '../../../interfaces/interfacesPagination';
import Pagination from '../../PaginationRows/PaginationRows';
import PopUp from '../../PopUp/PopUp';
import interfacesPopUp from '../../../interfaces/interfacesPopUp';

const AllEstimateMainPage: React.FC = observer(() => {
  const [listEstimate, setListEstimate] = useState([]);
  const [listEstimateData, setListEstimateData] = useState([]);
  const [statePopUp, setStatePopUp] = useState(false);
  const [renderRedirect, setRedirect] = useState(false);

  const buttonName: interfacesButtonCreate = {
    name: 'Создать',
    type: 'button',
    image: false,
    callbackClick: () => setStatePopUp(true)
  };
  const popUpData: interfacesPopUp = {
    name: store.CreationEditingEstimates.newNameEstimate,
    kind: 'Создание сметы',
    textMessage: 'Введите название',
    closeClick: () => setStatePopUp(false),
    button: {
      name: 'Создать',
      type: 'submit',
      image: false,
      callbackClick: store.CreationEditingEstimates.createNewEstimate,
      redirectPage: redirectPage
    },
    onChangeFunction: store.CreationEditingEstimates.onChangeFnEstimateName
  };

  const paginationDataEstimate: PaginationInterface = {
    arrayNumber: store.GeneralData.arrayNameAllEstimates,
    activeNumber: store.GeneralData.activePaginationAllEstimates,
    callbackPaginationArray: store.GeneralData.callbackPaginationArrayE,
    callbackPaginationRight: store.GeneralData.callbackPaginationRightE,
    callbackPaginationLeft: store.GeneralData.callbackPaginationLeftE
  };

  useEffect(() => {
    store.GeneralData.allEstimates().then((data: any) => {
      if (data === 'Error') {
        const noticeError: any = (
          <li key={'listEstimateEmpty'}>
            Упс, что-то пошло не так попробуйте перезагрузить страницу.
          </li>
        );
        setListEstimate(noticeError);
      } else {
        store.GeneralData.allDataEstimate = data;
        setListEstimateData(data);
        createRowsEstimate(
          data,
          store.GeneralData.activePaginationAllEstimates
        );
      }
    });
  }, []);

  function createRowsEstimate(data: any, pagination: number) {
    const list = data.map((item: any, i: number) => {
      return (
        <li
          key={'listEstimate' + i}
          className={
            !(
              (pagination - 1) * 10 < i + 1 &&
              i + 1 <= (pagination - 1) * 10 + 10
            )
              ? 'hide-row'
              : ''
          }
        >
          <Link to={'/estimate-' + item['names_estimates_id']}>
            {item['full_name']}
          </Link>
        </li>
      );
    });
    setListEstimate(list);
  }
  function redirectPage(idPage: number) {
    store.Estimate.idEstimate = idPage;
    setRedirect(true);
  }
  useEffect(() => {
    createRowsEstimate(
      listEstimateData,
      store.GeneralData.activePaginationAllEstimates
    );
  }, [store.GeneralData.activePaginationAllEstimates]);

  return (
    <div className="wapper-estimate">
      {statePopUp ? <PopUp {...popUpData} /> : null}
      <div className="wrapper-block-name-list">
        <p className="header-blok-view">Сметы</p>
        <ul className="list-estimate">{listEstimate}</ul>
      </div>
      <div className="wrapper-pagination-button-create">
        {store.GeneralData.arrayNameAllEstimates.length > 1 ? (
          <Pagination {...paginationDataEstimate} />
        ) : (
          ''
        )}
        {renderRedirect ? (
          <Redirect to={'estimate-' + store.Estimate.idEstimate} />
        ) : (
          ''
        )}
        <Button {...buttonName} />
      </div>
    </div>
  );
});
export default AllEstimateMainPage;
