import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Select, { SingleValue } from 'react-select';
import '../_User.scss';
import i18n from 'i18next';

export const LogIn: React.FC = () => {
  const { t } = useTranslation();

  const languages = [
    { label: 'English', value: 'en' },
    { label: 'Русский', value: 'ru' },
    { label: 'Українська', value: 'uk' },
    { label: 'Беларуская', value: 'by' }
  ];

  return (
    <div className="wrapper-user-profile">
      <Select
        onChange={(e: SingleValue<{ label: string; value: string }>): void => {
          i18n.changeLanguage(e?.value);
        }}
        options={languages}
        defaultValue={{ label: 'Беларуская', value: 'by' }}
        placeholder={t('placeholders.select')}
      />
      <Link to="/authorization" className="enter-in-system">
        <img
          src="../images/unknown-user.svg"
          alt="piggy"
          className="image-unknown-user"
        />
        <p>{t('authorization.sing-in')}</p>
      </Link>
    </div>
  );
};
