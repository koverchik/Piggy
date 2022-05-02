import React from 'react';
import './_styles.scss';
import { useTranslation } from 'react-i18next';

export const ButtonInput: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="wrapper-for-button">
      <input type="submit" value={t('button.add')} className="button-main" />
    </div>
  );
};
