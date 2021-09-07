import { makeObservable, action, observable } from 'mobx';
import axios from 'axios';

export default class UserState {
  constructor() {
    makeObservable(this, {});
  }
}
