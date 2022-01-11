import { observer } from 'mobx-react-lite';
import React from 'react';
import { observableUserProfile } from '../../Authorization/helper';
import LogIn from './LogIn/LogIn';
import UserProfile from './UserProfile/UserProfile';
import './_User.scss';

const User: React.FC = observer(() => {
  return observableUserProfile.isSingIn ? <UserProfile /> : <LogIn />;
});

export default User;
