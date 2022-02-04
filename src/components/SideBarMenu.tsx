import React from 'react';
import styled from 'styled-components/native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import {ChannelSectionList} from '../fakers';
import UserPicker from './UserPicker';
import SideBarItem from './SideBarItem';

export default function SideBarMenu(props: DrawerContentComponentProps) {
  function onPressItem() {
    props.navigation.toggleDrawer();
  }

  function renderItem(title: string, item: string) {
    if (title === 'Switch User') {
      return <UserPicker key={item} />;
    }
    return <SideBarItem key={item} item={item} onPressItem={onPressItem} />;
  }

  function renderSectionHeader(title: string, data: string[]) {
    return (
      <HeaderView key={title}>
        <HeaderText>{title}</HeaderText>
        {data.map(item => renderItem(title, item))}
      </HeaderView>
    );
  }

  return (
    <DrawerContentScrollView {...props}>
      <Container>
        {ChannelSectionList.map((item: {title: string; data: string[]}) =>
          renderSectionHeader(item.title, item.data),
        )}
      </Container>
    </DrawerContentScrollView>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const HeaderView = styled.View`
  flex: 1;
`;

const HeaderText = styled.Text`
  font-size: 16px;
  color: black;
  background-color: whitesmoke;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;
