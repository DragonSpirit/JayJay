import React from 'react';
import AuthorsScreen from './';

import renderer from 'react-test-renderer';

test('empty renders correctly', () => {
  const tree = renderer.create(<AuthorsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('non empty renders correctly', () => {
  const tree = renderer.create(<AuthorsScreen authors={['test']} />).toJSON();
  expect(tree).toMatchSnapshot();
})
