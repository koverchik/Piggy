import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import { SharingUserListType } from '../pages/WalletPage/types';
import { RequestUsersSystemsType } from './StateTypes';

export default class AddNewUserWallet {
  allDataUsersSystems: RequestUsersSystemsType[] = [];

  constructor() {
    makeObservable(this, {
      allDataUsersSystems: observable,
      requestAddUser: action,
      requestUsersSystems: action
    });
  }
  requestAddUser(
    id: string,
    newUser: number,
    AccessNewUser: string
  ): Promise<string> | Promise<SharingUserListType> {
    const response = axios
      .post(process.env.MIX_APP_URL_FOR_TEST + 'add-new-user-wallet', {
        id: id,
        newUser: newUser,
        AccessNewUser: AccessNewUser
      })
      .then(
        (response) => {
          return response.data;
        },
        (response) => {
          console.log('error request ' + response);
          return 'Error';
        }
      );
    return response;
  }

  requestUsersSystems(id: string): Promise<string | RequestUsersSystemsType[]> {
    const result = axios
      .post(process.env.MIX_APP_URL_FOR_TEST + 'all-users-system', {
        id: id
      })
      .then(
        (response) => {
          if (response.status === 200) {
            return response.data;
          }
        },
        (response) => {
          console.log('error request ' + response);
          return 'Error';
        }
      );
    return result;
  }
}
