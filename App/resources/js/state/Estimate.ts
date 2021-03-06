import { makeObservable, action, observable, configure } from 'mobx';
import axios from 'axios';

configure({
  enforceActions: 'never'
});

export default class Estimate {
  idEstimate = 0;
  nameEstimate = '';
  reactElemRows = new Array();
  dataRows = new Array();
  rowsLength = '';
  sumRows = '';
  newRow = '';
  newRowCost = '';
  pagination = new Array();
  reactElemPagination = new Array();
  activePagination = 0;
  validationNewRow = true;
  validationNewRowCost = true;
  messageNewRow = '';
  messeneNewRowCost = '';

  constructor() {
    makeObservable(this, {
      idEstimate: observable,
      sumRows: observable,
      rowsLength: observable,
      dataRows: observable,
      nameEstimate: observable,
      newRow: observable,
      reactElemPagination: observable,
      newRowCost: observable,
      pagination: observable,
      reactElemRows: observable,
      activePagination: observable,
      requestOneEstimate: action,
      requestNewRow: action,
      deleteRow: action,
      validationAdd: action,
      callbackPaginationArray: action
    });
  }

  callbackPaginationArray = (event: Event) => {
    const { textContent } = event.target as HTMLDivElement;
    if (textContent != null) {
      this.activePagination = +textContent;
    }
  };

  callbackPaginationLeft = () => {
    this.activePagination > 1
      ? (this.activePagination = this.activePagination - 1)
      : '';
  };

  callbackPaginationRight = () => {
    this.activePagination < this.pagination.length
      ? (this.activePagination = +this.activePagination + 1)
      : '';
  };

  async requestOneEstimate() {
    const result = axios
      .post(process.env.MIX_APP_URL_FOR_TEST + 'one-estimates', {
        id: this.idEstimate
      })
      .then(
        (response) => {
          this.nameEstimate = response.data[0].name;
          this.rowsLength = response.data.rows.length + 1;
          const countPagination = Math.ceil(response.data.rows.length / 10);
          let arrayPagination = [];
          for (let index = 0; index < countPagination; index++) {
            arrayPagination.push(index + 1);
          }
          this.pagination = arrayPagination;

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
        '???????????????????????? ???????? ?????? ????????????????????, ???????????????????? ???????????????????????? ???? ?????????? ???????? ????????????????.';
    } else if (this.newRow.length > 150) {
      this.validationNewRow = true;
      this.messageNewRow = '???????? ???? ?????????? ???????? ?????????? 150 ????????????????.';
    } else {
      this.validationNewRow = false;
    }

    if (Number.isNaN(Number(this.newRowCost))) {
      this.validationNewRowCost = true;
      this.messeneNewRowCost = '???????????????????? ???????????? ??????????.';
    } else if (Number(this.newRowCost) <= 0) {
      this.validationNewRowCost = true;
      this.messeneNewRowCost = '?????????????? ?????????? ???????????? 0';
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
            this.requestOneEstimate();
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
            this.requestOneEstimate();
          }
        },
        (response) => {
          console.log('error request ' + response);
          alert('??????-???? ?????????? ???? ??????, ???????????????????? ?????????????????????????? ????????????????...');
        }
      );
  }
}
