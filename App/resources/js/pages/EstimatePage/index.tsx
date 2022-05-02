import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import store from '../../state/index';
import AddRow from './AddRowEstimate';
import BodyTableEstimate from './BodyTableEstimate';
import './_style.scss';
import { HeaderTableEstimate } from './HeaderTableEstimate';
import { FooterTableEstimate } from './FooterTableEstimate';
import { RowEstimate } from '../../state/StateTypes';
import { Pagination } from '../../components/Pagination';
import { createArrayPagination } from '../../components/Helpers/ArrayPagination';

export const Estimate: React.FC = observer((props: any) => {
  const [listRowsEstimate, setlistRowsEstimate] = useState<
    RowEstimate[] | string
  >([]);
  const [arrayPagination, setArrayPagination] = useState<number[]>([]);

  const [activePart, setActivePart] = useState(1);

  useEffect(() => {
    store.Estimate.requestOneEstimate(props.match.params.id).then(
      (data: RowEstimate[] | string) => {
        setlistRowsEstimate(data);
        if (typeof data !== 'string') {
          setArrayPagination(createArrayPagination(data));
        }
      }
    );
  }, []);

  return (
    <div className="wrapper-one-estimate">
      <div className="one-estimate">
        <div className="wrapper-header-one-estimate section-to-print">
          <h2 className="header-one-estimate">{store.Estimate.nameEstimate}</h2>
          <a media="print" onClick={() => window.print()}>
            <div className="wrapper-button-edit-one-estimate">
              <img src="../images/print.svg"></img>
            </div>
          </a>
        </div>
        <table className="table-list-value section-to-print-table">
          <HeaderTableEstimate />
          <BodyTableEstimate
            listRowsEstimate={listRowsEstimate}
            pagination={activePart}
          />
          <FooterTableEstimate />
        </table>
        {listRowsEstimate.length > 10 && (
          <Pagination
            activePart={activePart}
            setActivePart={setActivePart}
            arrayPaginationNumber={arrayPagination}
          />
        )}
        <AddRow />
      </div>
    </div>
  );
});
