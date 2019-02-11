import {sortPostsByNewest, isPostInFavorites} from './utils'

it('should sort posts from newest to olders', () => {
  const posts = [{
    author: 'test',
    id: 2,
    did: 1,
    title: 'title',
    text: 'text',
    ts: 1549826744946,
    url: 'http://mockurl.local',
    img: '',
    tags: '',
    isFavorite: false,
  }, {
    author: 'test',
    id: 1,
    did: 1,
    title: 'title',
    text: 'text',
    ts: 1549826764450,
    url: 'http://mockurl.local',
    img: '',
    tags: '',
    isFavorite: false,
  }]
  const expectedData = [
    {
      author: 'test',
      id: 1,
      did: 1,
      title: 'title',
      text: 'text',
      ts: 1549826764450,
      url: 'http://mockurl.local',
      img: '',
      tags: '',
      isFavorite: false,
    },{
      author: 'test',
      id: 2,
      did: 1,
      title: 'title',
      text: 'text',
      ts: 1549826744946,
      url: 'http://mockurl.local',
      img: '',
      tags: '',
      isFavorite: false,
    }
  ]
  expect(sortPostsByNewest(posts)).toEqual(expectedData)
})

it('find correct post as favorite', () => {
  const favoritePosts = [{
    author: 'test',
    id: 1,
    did: 1,
    title: 'title',
    text: 'text',
    ts: 1549826744946,
    url: 'http://mockurl.local',
    img: '',
    tags: '',
    isFavorite: true,
  }, {
    author: 'test',
    id: 2,
    did: 1,
    title: 'title',
    text: 'text',
    ts: 1549826764450,
    url: 'http://mockurl.local',
    img: '',
    tags: '',
    isFavorite: true,
  }]
  expect(isPostInFavorites(favoritePosts, 2)).toEqual(true)
})