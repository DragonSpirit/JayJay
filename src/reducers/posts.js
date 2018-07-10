// @flow

import * as types from '../constants/actionTypes'
import type { PostsState, Action } from '../reducers/ReducerTypes'
import uniqBy from 'lodash.uniqby'

const postsInitialState: PostsState = {
  posts: [],
  favoritePosts: [],
}

export default function postsReducer(state: PostsState = postsInitialState, action: Action): PostsState {
  switch (action.type) {
    case types.LOAD_POSTS_SUCCESS: {
      const { result, author } = action.payload
      const mappedResult: Array<Object> = result.map(post => ({
        author,
        id: post.itemid,
        did: post.ditemid,
        title: post.subject,
        text: post.event,
        ts: post.event_timestamp,
        url: post.url,
        img: post.props.og_image,
        tags: post.props.taglist,
        isFavorite: false,
      }))
      const newPosts = uniqBy([...state.posts, ...mappedResult], 'did')
      const newState = {
        ...state,
        posts: newPosts,
      }
      return newState
    }
    case types.DELETE_AUTHOR: {
      const newState = {
        posts: state.posts.filter(post => post.author !== action.payload),
        favoritePosts: state.favoritePosts.filter(post => post.author !== action.payload),
      }
      return newState
    }
    default:
      return state
  }
}
