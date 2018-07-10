// @flow

import * as types from '../constants/common'

export const setAuthorsLoadingState = (isLoading: boolean) => ({
  type: types.SET_AUTHORS_LOADING_STATE,
  payload: isLoading,
})

export const setPostsLoadingState = (isLoading: boolean) => ({
  type: types.SET_POSTS_LOADING_STATE,
  payload: isLoading,
})
