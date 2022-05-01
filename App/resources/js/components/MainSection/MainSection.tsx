import React from 'react';
import './_MainSection.scss';
import { ButtonAdd } from '../ButtonAdd';
import { useTranslation } from 'react-i18next';

const MainSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="wrapper-main">
      <div className="wrapper-estimate">
        <p className="header-blok-view">{t('estimate.name')}</p>
        <p>{t('estimate.description')}</p>
        <img src="../images/estimate.svg" />
        {/* <ButtonAdd name={'Создать'} /> */}
      </div>
      <div className="wrapper-wallet">
        <p className="header-blok-view">{t('wallet.name')}</p>
        <p>{t('wallet.description')}</p>
        <img src="../images/wallet.svg" />
        {/* <ButtonAdd name={'Создать'} /> */}
      </div>
    </div>
  );
};

export default MainSection;
