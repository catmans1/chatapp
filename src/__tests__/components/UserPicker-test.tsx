import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';

import UserPicker from '../../components/UserPicker';

it('renders correctly', () => {
  const tree = renderer.create(<UserPicker />).toJSON();
  expect(tree).toMatchSnapshot();
});
