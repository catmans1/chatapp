import React, {createContext, useState} from 'react';

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
  };

  return (
    <ChannelContext.Provider
      value={{channel: value, setChannel: onHandleStore}}>
      {children}
    </ChannelContext.Provider>
  );
};

export default ChannelContextProvider;
