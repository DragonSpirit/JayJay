import React from 'react';
import FeedScreen from './';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<FeedScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with empty feed but exists authors', () => {
  const fetch = jest.fn();
  const tree = renderer.create(<FeedScreen authors={['test']} feed={[]} fetchPosts={fetch}/>).toJSON();
  expect(tree).toMatchSnapshot();
  expect(fetch).toBeCalled();
});

test('renders correctly with non empty feed and authors', () => {
  const fetch = jest.fn();
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
  const tree = renderer.create(<FeedScreen authors={['test']} feed={feed} fetchPosts={fetch}/>).toJSON();
  expect(tree).toMatchSnapshot();
  expect(fetch).toBeCalled();
});
