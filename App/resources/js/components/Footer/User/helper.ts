import { observableUserProfile } from '../../Authorization/helper';

export const logout = (): void => {
  observableUserProfile.reset();
};
