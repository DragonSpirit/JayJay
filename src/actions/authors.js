// @flow

import * as types from '../constants/actionTypes'
import { setAuthorsLoadingState } from './common'
import { Alert } from 'react-native'
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

export const requestAddAuthor = (author: string): ThunkAction => (dispatch: Dispatch, getState: GetState): void => {
  const state = getState()
  if (state.authors.includes(author.toLowerCase())) {
    Alert.alert(
      'Ошибка',
      'Такого пользователь уже находится в списке отслеживаемых',
    )
    return
  }
  dispatch(tryAddAuthor(author))
  dispatch(setAuthorsLoadingState(true))
  fetch(`https://${author}.livejournal.com`)
    .then((response: Object) => {
      if (response.ok) {
        dispatch(addAuthorSuccess(author))
        dispatch(setAuthorsLoadingState(false))
        return response.text()
      }
      throw new Error('User not found.')
    })
    .catch(error => {
      dispatch(setAuthorsLoadingState(false))
      dispatch(addAuthorFailure(error))
      Alert.alert(
        'Ошибка',
        'Такого пользователя скорее всего не существует',
      )
    })
}
