import React from 'react';
import './_MainSection.scss';
import { useTranslation } from 'react-i18next';
import { ButtonLink } from '../ButtonLink';

export const MainSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="wrapper-main">
      <div className="wrapper-estimate">
        <p className="header-blok-view">{t('estimate.name')}</p>
        <p>{t('estimate.description')}</p>
        <img src="../images/estimate.svg" />
        <ButtonLink name={t('button.create')} path={'/authorization'} />
      </div>
      <div className="wrapper-wallet">
        <p className="header-blok-view">{t('wallet.name')}</p>
        <p>{t('wallet.description')}</p>
        <img src="../images/wallet.svg" />
        <ButtonLink name={t('button.create')} path={'/authorization'} />
      </div>
    </div>
  );
};
