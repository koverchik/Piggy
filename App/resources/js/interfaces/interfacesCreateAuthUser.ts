import * as React from 'react';
import { ButtonAddType } from './interfacesButtonCreate';

interface CreateAuthUser extends React.HTMLAttributes<HTMLDivElement> {
  nameForm: string;
  repeatPassword: boolean;
  buttonSend: ButtonAddType;
  question: string;
  addressLink: string;
  callbackSend(): void;
}
export default CreateAuthUser;
