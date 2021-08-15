import React from 'react';
import './_MainSection.scss';
import Button from '../ButtonCreate/ButtonCreate';

const MainSection: React.FC = () => {
  return (
    <div className="wrapper-main">
      <div className="wapper-estimate">
        <p className="header-blok-view">Смета</p>
        <p>Спланируй свои расходы</p>
        <img src="../images/estimate.svg" />
        <Button />
      </div>
      <div className="wapper-wallet">
        <p className="header-blok-view">Кошелек</p>
        <p>Посчитай свои траты</p>
        <img src="../images/wallet.svg" />
        <Button />
      </div>
    </div>
  );
};

export default MainSection;
