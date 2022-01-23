import { observer } from 'mobx-react-lite';
import React from 'react';
import PaginationInterface from '../../interfaces/interfacesPagination';
import store from '../../state/index';
import PaginationRow from '../../components/PaginationRows/PaginationRows';
import AddRow from './AddRowEstimate/AddRowEstimate';
import BodyTableEstimate from './BodyTableEstimate/BodyTableEstimate';
import './_style.scss';
import { HeaderTableEstimate } from './HeaderTableEstimate';
import { FooterTableEstimate } from './FooterTableEstimate';

export const Estimate: React.FC = observer((props: any) => {
  store.Estimate.idEstimate = props.match.params.id;

  const paginationData: PaginationInterface = {
    arrayNumber: store.Estimate.pagination,
    activeNumber: store.Estimate.activePagination,
    callbackPaginationArray: store.Estimate.callbackPaginationLeft,
    callbackPaginationLeft: store.Estimate.callbackPaginationLeft,
    callbackPaginationRight: store.Estimate.callbackPaginationRight
  };

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
          <BodyTableEstimate idEstimate={props.match.params.id} />
          <FooterTableEstimate />
        </table>
        {/* {store.Estimate.pagination.length > 1 ? (
          <PaginationRow {...paginationData} />
        ) : (
          ''
        )} */}
        <AddRow />
      </div>
    </div>
  );
});
