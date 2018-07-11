import React from 'react';
import FavoriteScreen from './';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<FavoriteScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
