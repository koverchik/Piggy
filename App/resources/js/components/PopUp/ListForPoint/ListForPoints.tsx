import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import './_ListForPoints.scss';
import store from '../../../state';

const ListForPoints: React.FC = observer((props: any) => {
  const [stateUsers, setStateUsers] = useState();
  type UserList = {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    email_verified_at: string;
  };

  useEffect(() => {
    store.AddNewUserWallet.requestUsersSystems().then((data: any) => {
      store.AddNewUserWallet.allDataUsersSystems = data;
      createListUser(store.AddNewUserWallet.allDataUsersSystems);
    });
  }, []);
  function createListUser(
    data: any,
    serchData: string = store.AddNewUserWallet.newUser
  ) {
    const result = data.map((item: UserList, i: number) => {
      if (serchData === '') {
        return createTags(item, i);
      } else {
        if (
          item['email'].toUpperCase().indexOf(serchData.toUpperCase()) != -1 ||
          item['name'].toUpperCase().indexOf(serchData.toUpperCase()) != -1
        ) {
          return createTags(item, i);
        }
      }
    });
    setStateUsers(result);
  }

  function createTags(data: UserList, i: number) {
    return (
      <div
        className="one-user-list-user-data"
        key={'user' + i}
        onClick={props.callbackClickList}
      >
        <div className="wrapper-one-user">
          <img
            src="../images/people.svg"
            alt="user-pic"
            className="image-one-user"
          />
          <p data-id={data.id} className="name-one-user">
            {data.name}
          </p>
        </div>
        <p className="email-one-user">{data.email}</p>
      </div>
    );
  }
  useEffect(() => {
    createListUser(store.AddNewUserWallet.allDataUsersSystems);
  }, [store.AddNewUserWallet.newUser]);

  return (
    <div className={'list-users-data'} onClick={props.setList}>
      {stateUsers}
    </div>
  );
});
export default ListForPoints;
