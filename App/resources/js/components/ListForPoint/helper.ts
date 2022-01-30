import { UserList } from '.';

export const filterUsers = (searchData: string, data: UserList): boolean => {
  if (searchData === '') {
    return true;
  } else {
    if (
      data['email'].toUpperCase().indexOf(searchData.toUpperCase()) != -1 ||
      data['name'].toUpperCase().indexOf(searchData.toUpperCase()) != -1
    ) {
      return true;
    }
  }
  return false;
};
