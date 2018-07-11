import reducer, { commonInitialState }  from './common'
import * as types from '../constants/actionTypes'

describe('common reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(commonInitialState)
  })

  it('should handle update author loading', () => {
    const state = commonInitialState
    const expectedState = {
      authorsLoading: true,
      postsLoading: false,
    }
    expect(reducer(state, {
      type: types.SET_AUTHORS_LOADING_STATE,
      payload: true
    })).toEqual(expectedState)
  })

  it('should handle update posts loading', () => {
    const state = commonInitialState
    const expectedState = {
      authorsLoading: false,
      postsLoading: true,
    }
    expect(reducer(state, {
      type: types.SET_POSTS_LOADING_STATE,
      payload: true
    })).toEqual(expectedState)
  })
})
