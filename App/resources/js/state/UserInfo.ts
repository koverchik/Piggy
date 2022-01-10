import { action, configure, makeObservable, observable } from 'mobx';
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from 'react-google-login';

configure({
  enforceActions: 'observed'
});

export default class UserInfo {
  isSingIn = false;
  familyName = '';
  givenName = '';
  email = '';
  googleId = '';
  imageUrl = '';
  accessToken = '';

  constructor() {
    makeObservable(this, {
      familyName: observable,
      isSingIn: observable,
      givenName: observable,
      email: observable,
      googleId: observable,
      imageUrl: observable,
      accessToken: observable,
      getUserInfo: action
    });
  }

  getUserInfo = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): void => {
    if ('accessToken' in response) {
      this.accessToken = response.accessToken;
      this.familyName = response.profileObj.familyName;
      this.givenName = response.profileObj.givenName;
      this.email = response.profileObj.email;
      this.googleId = response.profileObj.googleId;
      this.imageUrl = response.profileObj.imageUrl;
      this.isSingIn = true;
    } else {
      console.log('offline');
    }
  };
}
