import { makeObservable, action, observable, configure } from 'mobx';
import axios from 'axios';
import {
  AllDataWalletType,
  SubmitDataNewRowWallet,
  WalletRowType
} from '../pages/WalletPage/Types';

configure({
  enforceActions: 'observed'
});

export default class Wallet {
  allUsers = [];
  newDataRaw = '';
  idWallet = 0;
  nameWallet = '';
  allSum = 0;
  newRowWallet = '';
  newRowCost = '';
  allRows = [];
  numberPagination = [];
  activePagination = 0;
  lengthRows = 0;
  lengthBurdenUser = 0;

  constructor() {
    makeObservable(this, {
      newDataRaw: observable,
      idWallet: observable,
      allSum: observable,
      newRowWallet: observable,
      newRowCost: observable,
      allRows: observable,
      lengthRows: observable,
      lengthBurdenUser: observable,
      numberPagination: observable,
      activePagination: observable,
      nameWallet: observable,
      startOneWallet: action,
      scopeOneWallet: action,
      addZero: action,
      addNewRow: action,
      gradeUser: action
    });
  }
  addZero(number: number) {
    return number < 10 ? `0${number}` : number;
  }

  startOneWallet(id: string): Promise<AllDataWalletType | string> {
    const nowDay = new Date();
    this.newDataRaw = `${nowDay.getFullYear()}-${this.addZero(
      nowDay.getMonth() + 1
    )}-${this.addZero(nowDay.getDate())}`;

    const result = axios
      .post(process.env.MIX_APP_URL_FOR_TEST + 'one-wallets', {
        id: id
      })
      .then(
        (response) => {
          const sumAllRows: number = response.data.rows.reduce(function (
            sum: number,
            elem: any
          ) {
            return sum + elem.amount;
          },
          0);
          this.allSum = +sumAllRows.toFixed(2);
          return response.data;
        },
        (response) => {
          console.log('error request ' + response);
          return 'Error';
        }
      );
    return result;
  }

  addNewRow(data: SubmitDataNewRowWallet): void | string {
    console.log(data);

    axios
      .post(process.env.MIX_APP_URL_FOR_TEST + 'add-new-row-wallet', {
        data
      })
      .then(
        (response) => {
          if (response.status === 200) {
            this.newRowWallet = '';
            this.newRowCost = '';
          }
        },
        (response) => {
          console.log('error request ' + response);
          return 'Error';
        }
      );
  }

  scopeOneWallet() {
    const result = axios
      .post(process.env.MIX_APP_URL_FOR_TEST + 'scope-one-wallet', {
        id: this.idWallet
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

  gradeUser(item: any) {
    let grade: string = '';
    if (item['edit_permission'] === 1 && item['delete_table'] === 1) {
      grade = 'Владелец';
    } else if (item['edit_row'] === 1 && item['delete_row'] === 1) {
      grade = 'Редактор';
    } else {
      grade = 'Пользователь';
    }
    return grade;
  }
}
