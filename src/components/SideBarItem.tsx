import React from 'react';
import styled from 'styled-components/native';

import useChannel from '../hooks/userChannel';

interface ISideBarItem {
  item: string;
  onPressItem: () => void;
}

export default function SideBarItem({item, onPressItem}: ISideBarItem) {
  const {setChannel} = useChannel();

  function onHandlePress() {
    setChannel(item);
    onPressItem && onPressItem();
  }

  return (
    <ItemTouchable key={item} onPress={onHandlePress}>
      <ItemText># {item}</ItemText>
    </ItemTouchable>
  );
}

const ItemTouchable = styled.TouchableOpacity`
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
