import { localStored } from 'mobx-stored';
import { GoogleLoginResponse } from 'react-google-login';

const defaultUser = {
  isSingIn: false,
  familyName: '',
  givenName: '',
  email: '',
  googleId: '',
  imageUrl: '',
  accessToken: ''
};

type observableUserProfileType = {
  isSingIn: boolean;
  familyName: string;
  givenName: string;
  email: string;
  googleId: string;
  imageUrl: string;
  accessToken: string;
  reset: () => void;
  destroy: () => void;
  extend: (obj: any) => void;
};

export const observableUserProfile: observableUserProfileType = localStored(
  'userProfile',
  defaultUser,
  {
    delay: 500
  }
);

export const saveUserInfo = (response: GoogleLoginResponse): void => {
  observableUserProfile.extend({
    isSingIn: true,
    familyName: response.profileObj.familyName,
    givenName: response.profileObj.givenName,
    email: response.profileObj.email,
    googleId: response.profileObj.googleId,
    imageUrl: response.profileObj.imageUrl,
    accessToken: response.accessToken
  });
};
