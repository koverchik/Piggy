import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import store from '../../state';
import './_style.scss';

type PaginationType = {
  arrayPaginationNumber: number[];
  activePart: number;
  setActivePart: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<PaginationType> = observer(
  ({ arrayPaginationNumber, activePart, setActivePart }) => {
    useEffect(() => {
      setActivePart(arrayPaginationNumber.length);
    }, [arrayPaginationNumber]);
    return (
      <div className="wrapper-number-pagination">
        <img
          src="../images/arrow-left.svg"
          onClick={() => activePart > 1 && setActivePart((item) => item - 1)}
          alt="arrow-left"
          className={
            activePart == 1
              ? 'disable-pagination image-pagination'
              : 'image-pagination'
          }
        />
        {arrayPaginationNumber.map((item: number) => {
          return (
            <div
              key={'pagination' + item}
              className={
                activePart == item
                  ? 'pagination-estimate active-number'
                  : 'pagination-estimate'
              }
              onClick={() => setActivePart(item)}
            >
              {item}
            </div>
          );
        })}
        <img
          src="../images/arrow-right.svg"
          onClick={() =>
            activePart < arrayPaginationNumber.length &&
            setActivePart((item) => item + 1)
          }
          alt="arrow-right"
          className={
            activePart == arrayPaginationNumber.length
              ? 'disable-pagination image-pagination'
              : 'image-pagination'
          }
        />
      </div>
    );
  }
);
