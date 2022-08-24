import { useContext, createContext, ReactNode, useState } from 'react';
import { useQuery } from '@apollo/client';
import { CHECK_USER } from 'renderer/graphql/queries';
import { User } from 'renderer/types/userTypes';
import { POLL_USER_FOR_LOGOUT_MSEC } from 'renderer/lib/constants';

type UserContextType = {
  setUser: React.Dispatch<React.SetStateAction<User>>;
} & User;

const UserContext = createContext({} as UserContextType);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({});

  useQuery<{ user: Partial<User> }>(CHECK_USER, {
    pollInterval: POLL_USER_FOR_LOGOUT_MSEC,
    fetchPolicy: 'no-cache',
    onCompleted: (respData) => {
      if (respData?.user) {
        setUser(respData?.user);
      } else {
        setUser({});
      }
    },
    onError: (err) => {
      if (err.message === 'user-not-logged') {
        setUser({});
      }
    },
  });

  const userContext = {
    ...user,
    setUser,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);