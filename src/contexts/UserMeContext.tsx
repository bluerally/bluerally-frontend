import { GetUserMeResponse } from '@/@types/user/type';
import { useGetUserMe } from '@/hooks/api/user';
import { useAuth } from '@/hooks/useAuth';
import { createContext, useEffect, useState } from 'react';

type Context = {
  currentUser: GetUserMeResponse | null;
};

export const UserMeContext = createContext<Context>({
  currentUser: null,
});

type Props = {
  children: React.ReactNode;
};

export const UserMeProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<GetUserMeResponse | null>(
    null,
  );
  const { isLoggedIn } = useAuth();

  const { data } = useGetUserMe(isLoggedIn);

  useEffect(() => {
    if (!data) {
      return;
    }

    setCurrentUser(data.data);
  }, [data]);

  return (
    <UserMeContext.Provider value={{ currentUser }}>
      {children}
    </UserMeContext.Provider>
  );
};
