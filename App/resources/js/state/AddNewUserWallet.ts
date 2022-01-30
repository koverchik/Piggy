import { makeObservable, action, observable, configure } from 'mobx';
import axios from 'axios';
import store from './index';
import { RequestUsersSystemsType } from './StateTypes';

export default class AddNewUserWallet {
  allDataUsersSystems = [];

  constructor() {
    makeObservable(this, {
      allDataUsersSystems: observable,

      addUser: action,
      userSearch: action,
      requestAddUser: action,
      requestUsersSystems: action
    });
  }

  userSearch = (event: Event) => {
    this.newUser = (event.target as HTMLInputElement).value;
  };

  addUser = (event: any) => {
    const newUserChanged =
      event.currentTarget.firstElementChild.lastElementChild;
    this.newUserId = newUserChanged.getAttribute('data-id');
    this.newUser = newUserChanged.textContent;
  };

  requestAddUser = (
    id: string,
    newUser: number,
    AccessNewUser: string
  ): Promise<string> | void => {
    console.log(id, newUser, AccessNewUser);

    axios
      .post(process.env.MIX_APP_URL_FOR_TEST + 'add-new-user-wallet', {
        id: id,
        newUser: newUser,
        AccessNewUser: AccessNewUser
      })
      .then(
        (response) => {
          if (response.status === 200) {
            // store.Wallet.allUsers.push({
            //   userName: this.newUser,
            //   userId: this.newUserId,
            //   debitCredit: 0
            // });
            // this.newUserId = 0;
            // this.newUser = '';
            // store.Wallet.lengthBurdenUser = store.Wallet.lengthBurdenUser + 1;
          }
        },
        (response) => {
          console.log('error request ' + response);
          return 'Error';
        }
      );
  };

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
