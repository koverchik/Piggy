import { observer } from 'mobx-react-lite';
import React from 'react';
import { FieldValues, UseFormHandleSubmit } from 'react-hook-form';

import './styles.scss';

type WrapperModalViewType = {
  setStatePopUp: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: UseFormHandleSubmit<{
    access: string;
    name: string;
  }>;
  onSumbit: ({ name, access }: FieldValues) => void;
  title: string;
  bodyContent: JSX.Element;
};

export const WrapperModalView: React.FC<WrapperModalViewType> = observer(
  ({ setStatePopUp, handleSubmit, onSumbit, title, bodyContent }) => {
    return (
      <div
        className="wrapper-for-background"
        onClick={() => setStatePopUp((prev) => !prev)}
      >
        <form
          className="wrapper-pop-up"
          onSubmit={handleSubmit(onSumbit)}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className="wrapper-header-create-new-name">
            <p>{title}</p>
            <img
              src="../images/cancel_white.svg"
              alt="close"
              className="close-img"
              onClick={() => setStatePopUp(false)}
            />
          </div>
          <div className="wrapper-for-name">{bodyContent}</div>
        </form>
      </div>
    );
  }
);
