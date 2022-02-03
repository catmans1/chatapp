import React, {createContext} from 'react';
import DeviceInfo from 'react-native-device-info';

export const TabletContext = createContext({
  isTablet: false,
});

interface ITablet {
  children: React.ReactChild;
}

const TabletContextProvider: React.FC<ITablet> = ({children}) => {
  return (
    <TabletContext.Provider value={{isTablet: DeviceInfo.isTablet()}}>
      {children}
    </TabletContext.Provider>
  );
};

export default TabletContextProvider;
