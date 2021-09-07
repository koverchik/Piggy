import { makeObservable, action, observable } from 'mobx';
import axios from 'axios';

export default class UserState {
  userId = undefined;
  constructor() {
    makeObservable(this, {
      userId: observable,
      requestUserAuth: action
    });
  }

  requestUserAuth() {
    axios.get('/sanctum/csrf-cookie').then((response) => {
      console.log(response);
    });
  }
}
