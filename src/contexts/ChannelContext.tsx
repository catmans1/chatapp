import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const STORAGE_CHANNEL = '@STORAGE_CHANNEL';

export const ChannelContext = createContext({
  channel: '',
  setChannel: (_: string) => {},
});

interface IUser {
  children: React.ReactChild;
}

const ChannelContextProvider: React.FC<IUser> = ({children}) => {
  const [value, setValueState] = useState<string>('');

  const onHandleStore = (val: string) => {
    setValueState(val);
    try {
      AsyncStorage.setItem(STORAGE_CHANNEL, val);
    } catch (error) {}
  };

  const getChannel = async () => {
    const channel = await AsyncStorage.getItem(STORAGE_CHANNEL);
    setValueState(channel || '');
  };

  useEffect(() => {
    getChannel();
  }, []);

  return (
    <ChannelContext.Provider
      value={{channel: value, setChannel: onHandleStore}}>
      {children}
    </ChannelContext.Provider>
  );
};

export default ChannelContextProvider;
