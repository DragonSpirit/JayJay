import reducer, { authorsInitialState } from './authors'
import * as types from '../constants/actionTypes'

describe('authors reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(authorsInitialState)
  })

  it('should handle add author to store', () => {
    const state = authorsInitialState
    const expectedState = ['test']
    expect(
      reducer(state, {
        type: types.ADD_AUTHOR_SUCCESS,
        payload: 'test',
      }),
    ).toEqual(expectedState)
  })

  it('should write to store author in lower case', () => {
    const state = authorsInitialState
    const expectedState = ['test']
    expect(
      reducer(state, {
        type: types.ADD_AUTHOR_SUCCESS,
        payload: 'TeSt',
      }),
    ).toEqual(expectedState)
  })

  it('should delete author from store', () => {
    const state = ['test']
    const expectedState = []
    expect(
      reducer(state, {
        type: types.DELETE_AUTHOR,
        payload: 'test',
      }),
    ).toEqual(expectedState)
  })

  it('should not delete author from store in different case', () => {
    const state = ['TeSt']
    const expectedState = ['TeSt']
    expect(
      reducer(state, {
        type: types.DELETE_AUTHOR,
        payload: 'test',
      }),
    ).toEqual(expectedState)
  })

  it('should clear authors list with CLEAR_AUTHORS action', () => {
    const state = ['test', 'tost']
    const expectedState = []
    expect(
      reducer(state, {
        type: types.CLEAR_AUTHORS,
      }),
    ).toEqual(expectedState)
  })
})
