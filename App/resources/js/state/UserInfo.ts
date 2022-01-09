import { action, makeObservable, observable } from 'mobx';
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from 'react-google-login';

export default class UserInfo {
  familyName = '';
  givenName = '';
  email = '';
  googleId = '';
  imageUrl = '';
  accessToken = '';

  constructor() {
    makeObservable(this, {
      familyName: observable,
      givenName: observable,
      email: observable,
      googleId: observable,
      imageUrl: observable,
      accessToken: observable,
      getUserInfo: action
    });
  }

  getUserInfo(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
    if ('accessToken' in response) {
      this.familyName = response.profileObj.familyName;
      this.givenName = response.profileObj.givenName;
      this.email = response.profileObj.email;
      this.googleId = response.profileObj.googleId;
      this.imageUrl = response.profileObj.imageUrl;
      this.accessToken = response.accessToken;
    } else {
      console.log('offline');
    }
  }
}
