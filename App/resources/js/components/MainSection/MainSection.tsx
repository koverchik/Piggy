import React from 'react';
import './_MainSection.scss';
import { ButtonAdd } from '../ButtonAdd';

const MainSection: React.FC = () => {
  return (
    <div className="wrapper-main">
      <div className="wrapper-estimate">
        <p className="header-blok-view">Смета</p>
        <p>Спланируй свои расходы</p>
        <img src="../images/estimate.svg" />
        {/* <ButtonAdd name={'Создать'} /> */}
      </div>
      <div className="wrapper-wallet">
        <p className="header-blok-view">Кошелек</p>
        <p>Посчитай свои траты</p>
        <img src="../images/wallet.svg" />
        {/* <ButtonAdd name={'Создать'} /> */}
      </div>
    </div>
  );
};

export default MainSection;
