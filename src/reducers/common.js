// @flow

import * as types from '../constants/actionTypes'
import type { CommonState, Action } from '../reducers/ReducerTypes'

const commonInitialState: CommonState = ({
  authorsLoading: false,
  postsLoading: false,
})

export default function commonReducer(state: CommonState = commonInitialState, action: Action): CommonState {
  switch (action.type) {
    case types.SET_AUTHORS_LOADING_STATE:
      return {...state, authorsLoading: action.payload}
    case types.SET_POSTS_LOADING_STATE:
      return {...state, postsLoading: action.payload}
    default:
      return state
  }
}
