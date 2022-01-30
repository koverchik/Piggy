import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import './_styles.scss';
import store from '../../state';
import { filterUsers } from './helper';

type ListForPointsType = {
  id: string;
  setNewUser: React.Dispatch<React.SetStateAction<string>>;
  setList: React.Dispatch<React.SetStateAction<boolean>>;
  searchData: string;
  setNewUserId: React.Dispatch<React.SetStateAction<number>>;
};

export type UserList = {
  id: number;
  name: string;
  email: string;
};

export const ListForPoints: React.FC<ListForPointsType> = observer(
  ({ id, setNewUser, setList, searchData, setNewUserId }) => {
    const [stateUsers, setStateUsers] = useState<UserList[]>([]);

    useEffect(() => {
      store.AddNewUserWallet.requestUsersSystems(id).then((data) => {
        if (typeof data !== 'string') {
          setStateUsers(data);
          store.AddNewUserWallet.allDataUsersSystems = data;
        }
      });
    }, []);

    return (
      <div className={'list-users-data'}>
        {stateUsers.map((data, i) => {
          return (
            filterUsers(searchData, data) && (
              <div
                className="one-user-list-user-data"
                key={'user' + i}
                onClick={() => {
                  setNewUser(data.name);
                  setList(!setList);
                  setNewUserId(data.id);
                }}
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
            )
          );
        })}
      </div>
    );
  }
);
