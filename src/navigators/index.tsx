import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import SideBarMenu from '../components/SideBarMenu';
import useTablet from '../hooks/useTablet';

const Drawer = createDrawerNavigator();

export default function Navigator() {
  const {isTablet} = useTablet();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        defaultStatus="open"
        drawerContent={SideBarMenu}
        screenOptions={{
          drawerType: isTablet ? 'permanent' : 'slide',
          drawerStyle: isTablet ? null : {width: '100%'},
          overlayColor: 'transparent',
          swipeEnabled: false,
        }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
