import React from 'react';
import './_ButtonAddNewRow.scss';

const ButtonAddNewRow: React.FC = () => {
  return (
    <div>
      <input className="button-add-new-item " type="submit" value="+" />
    </div>
  );
};

export default ButtonAddNewRow;
