import {RouteProp} from '@react-navigation/native';

export type AppRootParamList = {
  Home: undefined;
};

export type HomeRouteProp = RouteProp<AppRootParamList, 'Home'>;

// This registers which makes navigation fully type-safe.
// https://reactnavigation.org/docs/typescript#specifying-default-types-for-usenavigation-link-ref-etc
declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRootParamList {}
  }
}
