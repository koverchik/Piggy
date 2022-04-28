import React from 'react';
import './_styles.scss';

export const Button: React.FC = () => {
  return (
    <div className="wrapper-for-button">
      <input type="submit" value="Добавить" className="button-main" />
    </div>
  );
};
