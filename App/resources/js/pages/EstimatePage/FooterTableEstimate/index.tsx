import React from 'react';
import store from '../../../state';

export const FooterTableEstimate: React.FC = () => {
  return (
    <tfoot>
      <tr>
        <td className="empty-item"> </td>
        <td className="title-cost-all-item"> Итого: </td>
        <td className="cost-all-item"> {store.Estimate.sumRows} руб </td>
      </tr>
    </tfoot>
  );
};
