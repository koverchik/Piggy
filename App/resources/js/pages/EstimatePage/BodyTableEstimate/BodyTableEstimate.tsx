import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { EmptyEstimate } from '../../../components/EmptyEstimate';
import { ErrorEstimate } from '../../../components/ErrorEstimate';
import store from '../../../state/index';
import { RowEstimate } from '../../../state/StateTypes';

type BodyTableEstimateType = { idEstimate: number };

const BodyTableEstimate: React.FC<BodyTableEstimateType> = observer(
  ({ idEstimate }) => {
    const [listRowsEstimate, setlistRowsEstimate] = useState<
      RowEstimate[] | string
    >([]);

    useEffect(() => {
      store.Estimate.requestOneEstimate(idEstimate).then(
        (data: RowEstimate[] | string) => {
          setlistRowsEstimate(data);
        }
      );
    }, [store.Estimate.sumRows]);

    return (
      <tbody>
        {listRowsEstimate.length === 0 ? (
          <EmptyEstimate />
        ) : typeof listRowsEstimate === 'string' ? (
          <ErrorEstimate />
        ) : (
          listRowsEstimate.map((item: RowEstimate, i: number) => {
            console.log(item);

            return (
              <tr
                key={'RowEstimate' + i}
                // className={
                //   !(
                //     (pagination - 1) * 10 < i + 1 &&
                //     i + 1 <= (pagination - 1) * 10 + 10
                //   )
                //     ? 'display-none'
                //     : ''
                // }
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
