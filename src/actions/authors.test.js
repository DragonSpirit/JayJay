import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './authors'
import * as types from '../constants/actionTypes'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('authors async actions', () => {

  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('should not fire actions if user already in state', () => {
    const state = { authors: ['test'] }
    const store = mockStore(state)
    return store.dispatch(actions.requestAddAuthor('test')).catch(error => {
      expect(store.getActions()).toEqual([])
    })
  })

  it('should reject action with message if user already in state', () => {
    const state = { authors: ['test'] }
    const store = mockStore(state)
    const update = store.dispatch(actions.requestAddAuthor('test'))
    expect(update).rejects.toThrow('duplicate users')
  })

  it('should add user if response is 200', () => {
    const state = { authors: [] }
    fetchMock.getOnce('https://test.livejournal.com',  { status: 200} )

    const expectedActions = [
        { type: types.TRY_ADD_AUTHOR, payload: 'test' },
        { type: types.SET_AUTHORS_LOADING_STATE, payload: true },
        { type: types.ADD_AUTHOR_SUCCESS, payload: 'test' },
        { type: types.SET_AUTHORS_LOADING_STATE, payload: false },
      ]

    const store = mockStore(state)

    return store.dispatch(actions.requestAddAuthor('test')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should throw "unknown user" if response is 404', () => {
    const state = { authors: [] }
    fetchMock.getOnce('https://test.livejournal.com',  { status: 404 })

    const store = mockStore(state)

    const update = store.dispatch(actions.requestAddAuthor('test'))
    return expect(update).rejects.toThrow('unknown user')
  })

})
