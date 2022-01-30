import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import {
  AllDataWalletType,
  SharingUserListType,
  SubmitDataNewRowWallet,
  WalletRowType
} from '../pages/WalletPage/types';
import { DebitCreditTableType } from './StateTypes';

export default class Wallet {
  allUsers = [];
  newDataRaw = '';
  idWallet = 0;
  nameWallet = '';
  allSum = 0;
  newRowWallet = '';
  newRowCost = '';
  allRows: WalletRowType[] = [];
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
      debitCreditTable: action,
      addZero: action,
      addNewRow: action,
      gradeUser: action
    });
  }
  addZero(number: number): string | number {
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
            elem: WalletRowType
          ) {
            return sum + elem.amount;
          },
          0);
          this.allSum = +sumAllRows.toFixed(2);
          this.allRows = response.data.rows;
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
    axios
      .post(process.env.MIX_APP_URL_FOR_TEST + 'add-new-row-wallet', {
        data
      })
      .then(
        (response) => {
          this.allSum = this.allSum + response.data.amount;
          this.allRows.push(response.data);
        },
        (response) => {
          console.log('error request ' + response);
          return 'Error';
        }
      );
  }

  scopeOneWallet(id: string): Promise<string | SharingUserListType[]> {
    const result = axios
      .post(process.env.MIX_APP_URL_FOR_TEST + 'scope-one-wallet', {
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

  debitCreditTable(id: string): Promise<string | DebitCreditTableType[]> {
    const result = axios
      .post(process.env.MIX_APP_URL_FOR_TEST + 'debit-credit-wallet', {
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

  gradeUser(item: SharingUserListType): string {
    let grade = '';
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
