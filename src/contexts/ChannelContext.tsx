import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';

const STORAGE_CHANNEL = '@STORAGE_CHANNEL';

export const ChannelContext = createContext({
  channel: '',
  setChannel: (_: string) => {},
});

interface IChannel {
  children: React.ReactChild;
}

const ChannelContextProvider: React.FC<IChannel> = ({children}) => {
  const [value, setValueState] = useState<string>('');

  const onHandleStore = (val: string) => {
    setValueState(val);
    if (DeviceInfo.isTablet()) {
      try {
        AsyncStorage.setItem(STORAGE_CHANNEL, val);
      } catch (error) {}
    }
  };

  const getUser = async () => {
    const user = await AsyncStorage.getItem(STORAGE_CHANNEL);
    setValueState(user || 'General');
  };

  useEffect(() => {
    if (DeviceInfo.isTablet()) {
      getUser();
    }
  }, []);

  return (
    <ChannelContext.Provider
      value={{channel: value, setChannel: onHandleStore}}>
      {children}
    </ChannelContext.Provider>
  );
};

export default ChannelContextProvider;
