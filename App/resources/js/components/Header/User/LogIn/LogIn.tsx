import React from 'react';
import { Link } from 'react-router-dom';
import '../_User.scss';
import { useTranslation } from 'react-i18next';

export const LogIn: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="wrapper-user-profile">
      <Link to="/authorization" className="enter-in-system">
        <img
          src="../images/unknown-user.svg"
          alt="piggy"
          className="image-unknown-user"
        />
        <p>{t('sing-in')}</p>
      </Link>
    </div>
  );
};
