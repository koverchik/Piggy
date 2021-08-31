import { makeObservable, action, observable, configure } from 'mobx';
import axios from 'axios';

export default class CreationEditingWallets {
  newNameWallet = '';

  constructor() {
    makeObservable(this, {
      newNameWallet: observable,
      createNewWallet: action,
      onChangeFnWalletName: action
    });
  }

  createNewWallet = () => {
    const result = axios
      .post(process.env.MIX_APP_URL_FOR_TEST + 'new-wallet', {
        name: this.newNameWallet,
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
