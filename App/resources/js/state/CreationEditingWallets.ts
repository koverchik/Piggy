import axios from 'axios';
import { action, configure, makeObservable, observable } from 'mobx';

configure({
  enforceActions: 'observed'
});

export default class CreationEditingWallets {
  newNameWallet = '';

  constructor() {
    makeObservable(this, {
      newNameWallet: observable,
      createNewWallet: action,
      onChangeFnWalletName: action
    });
  }

  createNewWallet = (name: string) => {
    const result = axios
      .post(process.env.MIX_APP_URL_FOR_TEST + 'new-wallet', {
        name: name,
        idUser: 9
      })
      .then(
        (response) => {
          this.newNameWallet = '';
          return response.data;
        },

        (response) => {
          console.log('error request ' + response);
          return 'Error';
        }
      );
    return result;
  };

  onChangeFnWalletName = (event: any) => {
    this.newNameWallet = event.target.value;
  };
}
