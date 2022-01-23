import React from 'react';

export const EmptyEstimate: React.FC = () => {
  return (
    <tr key={'RowEstimate'} className="error-table">
      <td colSpan={4}>
        Здесь пока ничего нет, попробуйте добавить несколько строк
      </td>
    </tr>
  );
};
