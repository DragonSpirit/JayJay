import React from 'react';
import { AuthorsTabIcon } from './AuthorsTabIcon';
import { FavoriteTabIcon } from './FavoriteTabIcon';
import { FeedTabIcon } from './FeedTabIcon';

import renderer from 'react-test-renderer';

test('AuthorsTabIcon renders correctly', () => {
  const tree = renderer.create(<AuthorsTabIcon />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('FavoriteTabIcon renders correctly', () => {
  const tree = renderer.create(<FavoriteTabIcon />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('FeedTabIcon renders correctly', () => {
  const tree = renderer.create(<FeedTabIcon />).toJSON();
  expect(tree).toMatchSnapshot();
});
