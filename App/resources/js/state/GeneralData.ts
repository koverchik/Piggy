import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import { ResponseListNamesEstimateWallet } from './StateTypes';

export default class GeneralData {
  idUser = 9;

  constructor() {
    makeObservable(this, {
      idUser: observable,
      allWallets: action,
      allEstimates: action
    });
  }

  allEstimates(): Promise<ResponseListNamesEstimateWallet[] | string> {
    const result = axios
      .post(process.env.MIX_APP_URL_FOR_TEST + 'all-estimates', {
        id: this.idUser
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
    return result;
  }

  allWallets(): Promise<ResponseListNamesEstimateWallet[] | string> {
    const result = axios
      .post(process.env.MIX_APP_URL_FOR_TEST + 'all-wallets', {
        id: this.idUser
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
    return result;
  }
}
