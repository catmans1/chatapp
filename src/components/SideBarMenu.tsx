import React from 'react';
import {SectionList} from 'react-native';
import styled from 'styled-components/native';

import {ChannelSectionList} from '../fakers';
import UserPicker from './UserPicker';

export default function SideBarMenu() {
  function renderItem(props: {
    item: string;
    section: {data: string[]; title: string};
  }) {
    if (props.section.title === 'Switch User') {
      return <UserPicker />;
    }
    return (
      <ItemView>
        <ItemText># {props.item}</ItemText>
      </ItemView>
    );
  }

  function renderSectionHeader({section: {title}}: {section: {title: string}}) {
    return (
      <HeaderView>
        <HeaderText>{title}</HeaderText>
      </HeaderView>
    );
  }

  return (
    <Container>
      <SectionList
        sections={ChannelSectionList}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const HeaderView = styled.View`
  flex: 1;
  background-color: whitesmoke;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const HeaderText = styled.Text`
  font-size: 16px;
  color: black;
`;

const ItemView = styled.TouchableOpacity`
  flex: 1;
  background-color: white;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ItemText = styled.Text`
  font-size: 14px;
  color: #212020;
`;
