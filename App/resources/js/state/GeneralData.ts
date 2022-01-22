import { makeObservable, action, observable, configure } from 'mobx';
import axios from 'axios';
import { ResponseListNamesEstimateWallet } from './StateTypes';

configure({
  enforceActions: 'observed'
});

export default class GeneralData {
  idUser = 9;
  nameAllEstimates = 0;
  nameAllWallets = 0;
  activePaginationAllWallets = 0;
  activePaginationAllEstimates = 0;
  arrayNameAllEstimates = new Array();
  arrayNameAllWallets = new Array();
  allDataEstimate = {};
  allDataWallets = {};

  constructor() {
    makeObservable(this, {
      idUser: observable,
      nameAllEstimates: observable,
      arrayNameAllEstimates: observable,
      nameAllWallets: observable,
      allDataEstimate: observable,
      allDataWallets: observable,
      activePaginationAllWallets: observable,
      activePaginationAllEstimates: observable,
      arrayNameAllWallets: observable,
      allWallets: action,
      allEstimates: action,
      callbackPaginationRightW: action
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

  callbackPaginationRightW = () => {
    this.activePaginationAllWallets < this.arrayNameAllWallets.length
      ? (this.activePaginationAllWallets = +this.activePaginationAllWallets + 1)
      : '';
  };
  callbackPaginationLeftW = () => {
    this.activePaginationAllWallets > 1
      ? (this.activePaginationAllWallets = this.activePaginationAllWallets - 1)
      : '';
  };
  callbackPaginationArrayW = (event: Event) => {
    const { textContent } = event.target as HTMLDivElement;
    if (textContent != null) {
      this.activePaginationAllWallets = +textContent;
    }
  };

  callbackPaginationRightE = () => {
    this.activePaginationAllEstimates < this.arrayNameAllEstimates.length
      ? (this.activePaginationAllEstimates =
          +this.activePaginationAllEstimates + 1)
      : '';
  };
  callbackPaginationLeftE = () => {
    this.activePaginationAllEstimates > 1
      ? (this.activePaginationAllEstimates =
          this.activePaginationAllEstimates - 1)
      : '';
  };
  callbackPaginationArrayE = (event: Event) => {
    const { textContent } = event.target as HTMLDivElement;
    if (textContent != null) {
      this.activePaginationAllEstimates = +textContent;
    }
  };
}
