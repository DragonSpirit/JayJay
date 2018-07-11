import React from 'react';
import PostDetailScreen from './';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<PostDetailScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
