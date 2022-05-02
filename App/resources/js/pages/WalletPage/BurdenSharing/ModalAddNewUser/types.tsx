import { OptionsList } from '..';

export type ModalAddNewUserType = {
  setStatePopUp: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  stateUsers: OptionsList[] | undefined;
};

export type FieldValuesType = {
  access: string;
  name: { value: number; label: string };
};
