import React from 'react';
import FavoriteScreen from './';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<FavoriteScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with empty feed but exists authors', () => {
  const tree = renderer.create(<FavoriteScreen authors={['test']} feed={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with non empty feed and authors', () => {
  const feed = [{
    author: 'test',
    id: 1,
    did: 1,
    title: 'Test',
    text: 'Test',
    ts: 1,
    url: 'local.url',
    tags: 'tag',
    isFavorite: false,
  }]
  const tree = renderer.create(<FavoriteScreen authors={['test']} feed={feed} />).toJSON();
  expect(tree).toMatchSnapshot();
});