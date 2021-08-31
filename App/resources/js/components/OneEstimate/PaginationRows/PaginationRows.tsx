import React, { useEffect, useState } from 'react';
import store from '../../../state';
import './_PaginationRows.scss';
import { observer } from 'mobx-react-lite';

const PaginationRows: React.FC = observer(() => {
  const [listPaginationEstimate, setListPaginationEstimate] = useState([]);

  function createNumberPagination() {
    const resultPagination: any = store.Estimate.pagination.map(
      (item: number) => {
        return (
          <div
            key={'pagination' + item}
            className={
              store.Estimate.activePagination == item
                ? 'pagination-estimate active-number'
                : 'pagination-estimate'
            }
            onClick={clickPagination}
          >
            {item}
          </div>
        );
      }
    );
    setListPaginationEstimate(resultPagination);
  }

  function clickPagination(e: any) {
    store.Estimate.activePagination !== e.target.textContent
      ? (store.Estimate.activePagination = e.target.textContent)
      : '';
  }
  useEffect(() => {
    createNumberPagination();
  }, [store.Estimate.activePagination, store.Estimate.sumRows]);

  return (
    <div className="wrapper-number-pagination">
      <img
        src="../images/arrow-left.svg"
        onClick={() => {
          store.Estimate.activePagination > 1
            ? (store.Estimate.activePagination =
                store.Estimate.activePagination - 1)
            : '';
        }}
        alt="arrow-left"
        className={
          store.Estimate.activePagination == 1
            ? 'disable-pagination image-pagination'
            : 'image-pagination'
        }
      />
      {listPaginationEstimate}
      <img
        src="../images/arrow-right.svg"
        onClick={() => {
          store.Estimate.activePagination < store.Estimate.pagination.length
            ? (store.Estimate.activePagination =
                +store.Estimate.activePagination + 1)
            : '';
        }}
        alt="arrow-right"
        className={
          store.Estimate.activePagination == store.Estimate.pagination.length
            ? 'disable-pagination image-pagination'
            : 'image-pagination'
        }
      />
    </div>
  );
});
export default PaginationRows;
