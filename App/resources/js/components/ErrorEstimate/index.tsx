import React from 'react';

export const ErrorEstimate: React.FC = () => {
  return (
    <tr key={'RowEstimate'} className="error-table">
      <td colSpan={4}>
        Упс... Что-то пошло не так, попробуйте перезагрузить страницу
      </td>
    </tr>
  );
};
