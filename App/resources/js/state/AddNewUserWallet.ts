import { makeObservable, action, observable } from 'mobx';
import axios from 'axios';
import store from './index';

export default class AddNewUserWallet {
  newUser = '';
  newUserId = 0;
  AccessNewUser = '';
  allDataUsersSystems = [];

  constructor() {
    makeObservable(this, {
      newUser: observable,
      allDataUsersSystems: observable,
      newUserId: observable,
      AccessNewUser: observable,
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

  requestAddUser = () => {
    axios
      .post(process.env.MIX_APP_URL_FOR_TEST + 'add-new-user-wallet', {
        id: store.Wallet.idWallet,
        newUser: this.newUserId,
        AccessNewUser: this.AccessNewUser
      })
      .then(
        (response) => {
          if (response.status === 200) {
            store.Wallet.allUsers.push({
              userName: this.newUser,
              userId: this.newUserId,
              debitCredit: 0
            });
            this.newUserId = 0;
            this.newUser = '';
            store.Wallet.lengthBurdenUser = store.Wallet.lengthBurdenUser + 1;
          }
        },
        (response) => {
          console.log('error request ' + response);
          return 'Error';
        }
      );
  };

  requestUsersSystems() {
    const result = axios
      .post(process.env.MIX_APP_URL_FOR_TEST + 'all-users-system', {
        id: store.Wallet.idWallet
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
