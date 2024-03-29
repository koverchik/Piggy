import React from 'react';
import { observer } from 'mobx-react-lite';
import store from '../../../state/index';
import './_style.scss';

const AddRowEstimate: React.FC = observer(() => {
  return (
    <div>
      <form
        onSubmit={(event: any) => {
          store.Estimate.requestNewRow();
          event.preventDefault();
        }}
      >
        <table className="table-add-new-value">
          <tbody>
            <tr>
              <td className="namber-one-item exciting-text">
                {store.Estimate.rowsLength}
              </td>
              <td className="new-one-item">
                <input
                  type="text"
                  value={store.Estimate.newRow}
                  onChange={(event) => {
                    store.Estimate.newRow = event.target.value;
                    store.Estimate.validationAdd();
                  }}
                ></input>
                <span>
                  {store.Estimate.validationNewRow
                    ? store.Estimate.messageNewRow
                    : ''}
                </span>
              </td>
              <td className="new-cost-one-item">
                <input
                  type="text"
                  value={store.Estimate.newRowCost}
                  onChange={(event) => {
                    store.Estimate.newRowCost = event.target.value;
                    store.Estimate.validationAdd();
                  }}
                ></input>
                <span>
                  {store.Estimate.validationNewRowCost
                    ? store.Estimate.messageNewRowCost
                    : ''}
                </span>
              </td>
              <td className="empty-item"> </td>
            </tr>
          </tbody>
        </table>
        <div>
          <input
            className="button-add-new-item "
            type="submit"
            value="+"
            disabled={
              !store.Estimate.validationNewRow &&
              !store.Estimate.validationNewRowCost
                ? false
                : true
            }
          />
        </div>
      </form>
    </div>
  );
});
export default AddRowEstimate;
