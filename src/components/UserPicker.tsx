import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

import ModalDropdown from '../libs/DropDown/ModalDropdown';
import useUser from '../hooks/useUser';
import {UserList} from '../fakers';
import {useEffect} from 'react';

export default function UserPicker() {
  const {user, setUser} = useUser();

  const [value, setValue] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const currentUser = user?.length > 0 ? user : UserList[0];
    setValue(currentUser);
  }, [user]);

  function onHandleSelect(_: string, option: string) {
    if (value !== option) {
      setValue(option);
      setUser(option);
    }
  }

  return (
    <ModalDropdown
      defaultValue={value}
      onSelect={onHandleSelect}
      options={UserList}
      style={styles.container}
      textStyle={styles.dropDownText}
      dropdownStyle={styles.dropDownContainer}
      renderRightComponent={() => {
        return <Icon name={open ? 'up' : 'down'} size={14} />;
      }}
      renderRow={(option: string) => {
        return <TextPicker>{option}</TextPicker>;
      }}
      onDropdownWillShow={() => setOpen(true)}
      onDropdownWillHide={() => setOpen(false)}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 6,
    borderColor: '#c4c0c0',
    borderWidth: 1,
    justifyContent: 'center',
  },
  dropDownContainer: {
    height: UserList.length * 40,
    width: '95%',
    marginTop: 15,
    marginLeft: -10,
    borderRadius: 6,
    borderColor: '#c4c0c0',
    borderWidth: 1,
    justifyContent: 'center',
  },
  dropDownText: {
    flex: 1,
    color: 'black',
    fontSize: 16,
  },
});

const TextPicker = styled.Text`
  color: black;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  font-size: 16px;
`;
