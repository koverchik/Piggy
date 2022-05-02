import React, { FC } from 'react';
import { ButtonAddType } from '../../interfaces/interfacesButtonCreate';
import './_styles.scss';

export const ButtonAdd: FC<ButtonAddType> = ({
  name,
  srcImage,
  callbackClick
}: ButtonAddType) => {
  return (
    <button
      className="button-main"
      onClick={() => callbackClick((prev) => !prev)}
    >
      {srcImage && <img src={srcImage} alt="add new user" />}
      {name}
    </button>
  );
};
