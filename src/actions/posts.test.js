import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon'
import * as posts from './posts'
import { postsInitialState } from "../reducers/posts";
import API from '../helpers/API'
import * as types from "../constants/actionTypes";
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('posts async actions', () => {

  let post

  beforeEach(() => {
    post = sinon.stub(API, 'getevents')
  })

  afterEach(() => {
    post.restore()
  })

  it('should add posts to store if response ok', () => {
    const expectedActions = [
      { type: types.SET_POSTS_LOADING_STATE, payload: true },
      { type: types.TRY_LOAD_POSTS, payload: 'test' },
      { type: types.LOAD_POSTS_SUCCESS, payload: {author: 'test', result: []} },
      { type: types.SET_POSTS_LOADING_STATE, payload: false },
    ]

    post.yields(null, {events: []})
    const store = mockStore(postsInitialState)
    return store.dispatch(posts.requestLoadPosts('test'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('should not add posts if response not ok', () => {
    const expectedActions = [
      { type: types.SET_POSTS_LOADING_STATE, payload: true },
      { type: types.TRY_LOAD_POSTS, payload: 'test' },
      { type: types.LOAD_POSTS_FAILURE, payload: new Error('loading error') },
      { type: types.SET_POSTS_LOADING_STATE, payload: false },
    ]

    post.yields(new Error('loading error'))
    const store = mockStore(postsInitialState)
    return store.dispatch(posts.requestLoadPosts('test'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('should fire add action', () => {
    const expectedActions = [{type: types.ADD_POST_TO_FAVORITES, payload: {id: 1}}]
    const store = mockStore(postsInitialState)
    store.dispatch(posts.addPostToFavorites(1))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should fire remove action', () => {
    const expectedActions = [{type: types.REMOVE_POST_FROM_FAVORITES, payload: {id: 1}}]
    const store = mockStore(postsInitialState)
    store.dispatch(posts.removePostFromFavorites(1))
    expect(store.getActions()).toEqual(expectedActions)
  })
})


