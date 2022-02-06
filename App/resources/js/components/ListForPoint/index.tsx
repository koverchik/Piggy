import { observer } from 'mobx-react-lite';
import React from 'react';
import { filterUsers } from './helper';
import './_styles.scss';

type ListForPointsType = {
  setNewUser: React.Dispatch<React.SetStateAction<string>>;
  setList: React.Dispatch<React.SetStateAction<boolean>>;
  searchData: string;
  setNewUserId: React.Dispatch<React.SetStateAction<number>>;
  stateUsers: UserList[] | undefined;
};

export type UserList = {
  id: number;
  name: string;
  email: string;
};

export const ListForPoints: React.FC<ListForPointsType> = observer(
  ({ setNewUser, setList, searchData, setNewUserId, stateUsers }) => {
    return stateUsers ? (
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
    ) : (
      <div className={'list-users-data'}>
        <p>Доступных пользоватей нет</p>
      </div>
    );
  }
);
