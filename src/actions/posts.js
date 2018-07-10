// @flow

import * as types from '../constants/actionTypes'
import type { Action, Dispatch, GetState } from '../reducers/ReducerTypes'
import API from '../helpers/API'
import { setPostsLoadingState } from './common'

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
  type: types.ADD_AUTHOR_FAILURE,
  payload: error,
})

export const requestLoadPosts = (author: string) => (dispatch: Dispatch, getState: GetState) => {
  dispatch(tryLoadPosts(author))
  dispatch(setPostsLoadingState(true))
  API.getevents({
    journal: author,
    auth_method: 'noauth',
    selecttype: 'lastn',
    howmany: 20,
  }, (error: Error, value) => {
    if (error) {
      dispatch(loadPostsFailure(error))
    }
    value && dispatch(loadPostsSuccess(author, value.events))
    dispatch(setPostsLoadingState(false))
  })
}
