// @flow

import * as types from '../constants/actionTypes'
import API from '../helpers/API'
import { setPostsLoadingState } from './common'

import type { Action, Dispatch } from '../reducers/ReducerTypes'

const tryLoadPosts = (author: string): Action => ({
  type: types.TRY_LOAD_POSTS,
  payload: author,
})

const loadPostsSuccess = (author: string, result: Array<Object>): Action => ({
  type: types.LOAD_POSTS_SUCCESS,
  payload: {
    author,
    result,
  },
})

const loadPostsFailure = (error: Error): Action => ({
  type: types.LOAD_POSTS_FAILURE,
  payload: error,
})

export const addPostToFavorites = (id: number): Action => ({
  type: types.ADD_POST_TO_FAVORITES,
  payload: {
    id,
  },
})

export const removePostFromFavorites = (id: number): Action => ({
  type: types.REMOVE_POST_FROM_FAVORITES,
  payload: {
    id,
  },
})

export const requestLoadPosts = (author: string) => (dispatch: Dispatch) => {
  dispatch(setPostsLoadingState(true))
  dispatch(tryLoadPosts(author))
  return getEventsFromServer(author)
    .then(value => {
      value && dispatch(loadPostsSuccess(author, value.events))
    })
    .catch(error => {
      dispatch(loadPostsFailure(error))
    })
    .finally(() => {
      dispatch(setPostsLoadingState(false))
    })
}

export const getEventsFromServer = (author: string) => {
  return new Promise((resolve, reject) => {
    API.getevents(
      {
        journal: author,
        auth_method: 'noauth',
        selecttype: 'lastn',
        howmany: 20,
      },
      (error: Error, value) => {
        if (error) {
          reject(error)
        }
        resolve(value)
      },
    )
  })
}
