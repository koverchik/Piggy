import React from 'react';
import { observer } from 'mobx-react-lite';
import UserCheckInAndAuth from '../UserCheckInAndAuth/UserCheckInAndAuth';
import createAuthUser from '../../interfaces/interfacesCreateAuthUser';

const Authentication: React.FC = observer((props: any) => {
  const dataProps: createAuthUser = {
    nameForm: 'Авторизация',
    repeatPassword: false,
    buttonSend: {
      name: 'Войти',
      image: false,
      type: 'submit'
    },
    question: 'Еще нет аккунта?',
    adressLink: 'registration',
    callbackSend: () => {
      console.log('hello');
    }
  };
  return <UserCheckInAndAuth {...dataProps} />;
});
export default Authentication;
