// @flow

import * as types from '../constants/actionTypes'

import type { AuthorsState, Action } from '../reducers/ReducerTypes'

export const authorsInitialState: AuthorsState = []

export default function authorsReducer(
  state: AuthorsState = authorsInitialState,
  action: Action,
): AuthorsState {
  switch (action.type) {
    case types.ADD_AUTHOR_SUCCESS:
      return [...state, action.payload.toLowerCase()]
    case types.DELETE_AUTHOR: {
      return remove(state, action.payload)
    }
    case types.CLEAR_AUTHORS: {
      return []
    }
    default:
      return state
  }
}

const remove = (array: Array<any>, element: any) => (array.filter(e => e !== element): Array<any>)
