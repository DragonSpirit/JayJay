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
      { type: types.TRY_LOAD_POSTS, payload: 'test' },
      { type: types.SET_POSTS_LOADING_STATE, payload: true },
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
      { type: types.TRY_LOAD_POSTS, payload: 'test' },
      { type: types.SET_POSTS_LOADING_STATE, payload: true },
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

})


