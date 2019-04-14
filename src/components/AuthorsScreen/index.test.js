import React from 'react';
import AuthorsScreen from './';
import renderer from 'react-test-renderer';

const fetch = jest.fn()

test('empty renders correctly', () => {
  const tree = renderer.create(<AuthorsScreen fetchPosts={fetch}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('non empty renders correctly', () => {
  const tree = renderer.create(<AuthorsScreen authors={['test']} fetchPosts={fetch} />).toJSON();
  expect(tree).toMatchSnapshot();
})

test('should delete author', () => {
  const deleteAuthor = jest.fn();
  const tree = renderer.create(<AuthorsScreen authors={['test']} deleteAuthor={deleteAuthor} fetchPosts={fetch}/>);
  tree.getInstance().deleteUser('test');
  expect(deleteAuthor).toHaveBeenCalledWith('test');
})