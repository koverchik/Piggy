import React from 'react';
import { Link } from 'react-router-dom';
import './_styles.scss';

export const ButtonLink = ({
  name,
  path
}: {
  name: string;
  path: string;
}): JSX.Element => {
  return (
    <div className="wrapper-for-button">
      <Link to={path} className="button-main button-link">
        {name}
      </Link>
    </div>
  );
};
