import React from 'react';

type ErrorTableLoadingType = {
  colSpan: number;
};

export const ErrorTableLoading: React.FC<ErrorTableLoadingType> = (
  props: ErrorTableLoadingType
) => {
  return (
    <tr key={'ErrorRow'} className="error-table">
      <td colSpan={props.colSpan}>
        Упс... Что-то пошло не так, попробуйте перезагрузить страницу
      </td>
    </tr>
  );
};
