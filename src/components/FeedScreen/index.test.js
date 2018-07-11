import React from 'react';
import FeedScreen from './';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<FeedScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
