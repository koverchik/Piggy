import { observer } from 'mobx-react-lite';
import React from 'react';
import createAuthUser from '../../interfaces/interfacesCreateAuthUser';
import UserCheckInAndAuth from '../UserCheckInAndAuth/UserCheckInAndAuth';

const Registration: React.FC = observer((props: any) => {
  const dataProps: createAuthUser = {
    nameForm: 'Регистрация',
    repeatPassword: true,
    buttonSend: {
      name: 'Регистрация',
      image: false,
      type: 'submit'
    },
    question: 'Уже есть аккаунт?',
    addressLink: 'authentication',
    callbackSend: () => {
      console.log('hello');
    }
  };
  return <UserCheckInAndAuth {...dataProps} />;
});
export default Registration;
