import { makeObservable, action, observable } from 'mobx';
import axios from 'axios';

export default class CreationEditingEstimates {
  newNameEstimate = '';

  constructor() {
    makeObservable(this, {
      newNameEstimate: observable,
      createNewEstimate: action,
      onChangeFnEstimateName: action
    });
  }

  createNewEstimate = () => {
    const result = axios
      .post(process.env.MIX_APP_URL_FOR_TEST + 'new-estimate', {
        name: this.newNameEstimate,
        idUser: 9
      })
      .then(
        (response) => {
          if (response.status === 200) {
            this.newNameEstimate = '';
            return response.data;
          }
        },
        (response) => {
          console.log('error request ' + response);
          return 'Error';
        }
      );
    return result;
  };

  onChangeFnEstimateName = (event: any) => {
    this.newNameEstimate = event.target.value;
  };
}
