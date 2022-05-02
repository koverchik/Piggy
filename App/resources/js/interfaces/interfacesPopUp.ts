import * as React from 'react';
import { ButtonAddType } from './interfacesButtonCreate';
import interfacesUsersList from './interfacesUsersList';
import interfacesAccessOptions from './interfacesAccessOptions';

interface interfacesPopUp extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  textMessage: string;
  kind: string;
  listUser?: interfacesUsersList;
  accessList?: interfacesAccessOptions;
  closeClick: () => void;
  button: ButtonAddType;
  onChangeFunction(event: Event | null): void;
}
export default interfacesPopUp;
