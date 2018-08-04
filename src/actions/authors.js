// @flow

import * as types from '../constants/actionTypes'
import { setAuthorsLoadingState } from './common'
import type {
  PrimitiveAction,
  Action,
  ThunkAction,
  Dispatch,
  GetState,
} from '../reducers/ReducerTypes'

const tryAddAuthor = (author: string): Action => ({
  type: types.TRY_ADD_AUTHOR,
  payload: author,
})

const addAuthorSuccess = (author: string): Action => ({
  type: types.ADD_AUTHOR_SUCCESS,
  payload: author,
})

const addAuthorFailure = (error: Error): Action => ({
  type: types.ADD_AUTHOR_FAILURE,
  payload: error,
})

export const deleteAuthor = (author: string): Action => ({
  type: types.DELETE_AUTHOR,
  payload: author,
})

export const clearAuthors = (): PrimitiveAction => ({
  type: types.CLEAR_AUTHORS,
})

export const requestAddAuthor = (author: string): ThunkAction =>
  (dispatch: Dispatch, getState: GetState): Promise<any> => {
    const state = getState()
    if (state.authors.includes(author.toLowerCase())) {
      return Promise.reject(new Error('duplicate users'))
    }
    dispatch(tryAddAuthor(author))
    dispatch(setAuthorsLoadingState(true))
    return fetch(`https://${author}.livejournal.com`)
      .then((response: Object) => {
        if (response.ok) {
          dispatch(addAuthorSuccess(author))
          dispatch(setAuthorsLoadingState(false))
          Promise.resolve(response.text())
        } else {
          throw new Error('User not found.')
        }
      })
      .catch(error => {
        dispatch(addAuthorFailure(error))
        dispatch(setAuthorsLoadingState(false))
        return Promise.reject(new Error('unknown user'))
      })
  }
