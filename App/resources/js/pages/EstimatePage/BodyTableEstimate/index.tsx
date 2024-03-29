import { observer } from 'mobx-react-lite';
import React from 'react';
import { EmptyEstimate } from '../../../components/EmptyEstimate';
import { ErrorTableLoading } from '../../../components/ErrorTableLoading';
import store from '../../../state/index';
import { RowEstimate } from '../../../state/StateTypes';

type BodyTableEstimateType = {
  listRowsEstimate: string | RowEstimate[];
  pagination: number;
};

const BodyTableEstimate: React.FC<BodyTableEstimateType> = observer(
  ({ listRowsEstimate, pagination }) => {
    return (
      <tbody>
        {listRowsEstimate.length === 0 ? (
          <EmptyEstimate />
        ) : typeof listRowsEstimate === 'string' ? (
          <ErrorTableLoading colSpan={4} />
        ) : (
          listRowsEstimate.map((item: RowEstimate, i: number) => {
            return (
              <tr
                key={'RowEstimate' + i}
                className={
                  !(
                    (pagination - 1) * 10 < i + 1 &&
                    i + 1 <= (pagination - 1) * 10 + 10
                  )
                    ? 'display-none'
                    : ''
                }
              >
                <td className="namber-one-item"> {i + 1} </td>
                <td className="name-one-item"> {item['name']} </td>
                <td className="cost-one-item"> {item['amount']} руб </td>
                <td className="namber-one-item trash-image">
                  <img
                    src="../images/delete-one-peope.svg"
                    id-data={item['id']}
                    onClick={(e: any) =>
                      store.Estimate.deleteRow(e.target.getAttribute('id-data'))
                    }
                  />
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    );
  }
);
export default BodyTableEstimate;
