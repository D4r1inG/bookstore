import { Spin } from '@/UI';
import React, { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { Login } from './Login';
import { decodeToken } from '@/utils/functions';

interface Props {
  children: ReactNode;
}

const context = createContext<any>({});

const Author: React.FC<Props> = ({ children }) => {
  const [isAllowed, setIsAllowed] = useState<boolean>();
  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIsAllowed(false);
      return;
    }

    const { rol } = decodeToken(token);

    setUserInfo({
      role: rol.includes('ADMIN') ? 'admin' : 'user',
    });
    setIsAllowed(true);
  }, []);

  const value = useMemo(() => ({ userInfo }), [userInfo]);

  if (typeof isAllowed === 'undefined')
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin />
      </div>
    );

  if (!isAllowed) {
    return <Login setIsAllowed={setIsAllowed} setUserInfo={setUserInfo} />;
  }

  return (
    <div className="flex flex-col overflow-x-hidden max-h-[100vh]">
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Add Nav bar here */}
        <context.Provider value={value}>{children}</context.Provider>
      </main>
    </div>
  );
};

export const useUserInfo = () => React.useContext(context);

export default Author;
