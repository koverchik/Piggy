import { makeObservable, action, observable, configure } from 'mobx';
import axios from 'axios';

configure({
  enforceActions: 'observed'
});
export default class CreationEditingEstimates {
  newNameEstimate = '';

  constructor() {
    makeObservable(this, {
      newNameEstimate: observable,
      createNewEstimate: action,
      onChangeFnEstimateName: action
    });
  }

  createNewEstimate = (newName: string) => {
    const result = axios
      .post(process.env.MIX_APP_URL_FOR_TEST + 'new-estimate', {
        name: newName,
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
