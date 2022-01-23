import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import { RowEstimate } from './StateTypes';

export default class Estimate {
  idEstimate = 0;
  nameEstimate = '';
  reactElemRows = [];
  rowsLength = '';
  sumRows = '';
  newRow = '';
  newRowCost = '';
  validationNewRow = true;
  validationNewRowCost = true;
  messageNewRow = '';
  messageNewRowCost = '';

  constructor() {
    makeObservable(this, {
      idEstimate: observable,
      sumRows: observable,
      rowsLength: observable,
      nameEstimate: observable,
      newRow: observable,
      newRowCost: observable,
      reactElemRows: observable,
      requestOneEstimate: action,
      requestNewRow: action,
      deleteRow: action,
      validationAdd: action
    });
  }

  async requestOneEstimate(
    idEstimate: number
  ): Promise<RowEstimate[] | string> {
    const result = axios
      .post(process.env.MIX_APP_URL_FOR_TEST + 'one-estimates', {
        id: idEstimate
      })
      .then(
        (response) => {
          this.nameEstimate = response.data.name;

          const sumAllRows: number = response.data.rows.reduce(function (
            sum: number,
            elem: any
          ) {
            return sum + elem.amount;
          },
          0);

          this.sumRows = sumAllRows.toFixed(2);

          return response.data.rows;
        },
        (response) => {
          console.log('error request ' + response);
          return 'Error';
        }
      );
    return result;
  }

  validationAdd() {
    if (this.newRow.length < 2) {
      this.validationNewRow = true;
      this.messageNewRow =
        'Обязательное поле для заполнение, необходимо использовать не менее двух символов.';
    } else if (this.newRow.length > 150) {
      this.validationNewRow = true;
      this.messageNewRow = 'Поле не может быть более 150 символов.';
    } else {
      this.validationNewRow = false;
    }

    if (Number.isNaN(Number(this.newRowCost))) {
      this.validationNewRowCost = true;
      this.messageNewRowCost = 'Необходимо ввести число.';
    } else if (Number(this.newRowCost) <= 0) {
      this.validationNewRowCost = true;
      this.messageNewRowCost = 'Введите число больше 0';
    } else {
      this.validationNewRowCost = false;
    }
  }

  requestNewRow() {
    const id_user = '9';

    const result = axios
      .post(process.env.MIX_APP_URL_FOR_TEST + 'write-one-estimates', {
        id: this.idEstimate,
        name: this.newRow,
        cost: this.newRowCost,
        id_user: id_user
      })
      .then(
        (response) => {
          if (response.status === 200) {
            // this.requestOneEstimate();
            this.newRow = '';
            this.newRowCost = '';
            this.validationNewRow = true;
            this.validationNewRowCost = true;
          }
        },
        (response) => {
          console.log('error request ' + response);
          alert('Error' + response);
        }
      );
  }

  deleteRow(numberRow: number) {
    axios
      .post(process.env.MIX_APP_URL_FOR_TEST + 'delete-estimate', {
        id_row: numberRow
      })
      .then(
        (response) => {
          if (response.status === 200) {
            // this.requestOneEstimate();
          }
        },
        (response) => {
          console.log('error request ' + response);
          alert('Что-то пошло не так, попробуйте перезагрузить страницу...');
        }
      );
  }
}
