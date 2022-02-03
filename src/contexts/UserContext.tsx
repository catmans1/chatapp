import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const STORAGE_USER = '@STORAGE_USER';

export const UserContext = createContext({
  user: '',
  setUser: (_: string) => {},
});

interface IUser {
  children: React.ReactChild;
}

const UserContextProvider: React.FC<IUser> = ({children}) => {
  const [value, setValueState] = useState<string>('');

  const onHandleStore = (val: string) => {
    setValueState(val);
    try {
      AsyncStorage.setItem(STORAGE_USER, val);
    } catch (error) {}
  };

  const getUser = async () => {
    const user = await AsyncStorage.getItem(STORAGE_USER);
    setValueState(user || '');
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{user: value, setUser: onHandleStore}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
