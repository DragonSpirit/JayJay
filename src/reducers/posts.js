// @flow

import * as types from '../constants/actionTypes'
import type { PostsState, Action, Post, ResponsePost } from '../reducers/ReducerTypes'
import uniqBy from 'lodash.uniqby'

export const postsInitialState: PostsState = {
  posts: [],
  favoritePosts: [],
}

export default function postsReducer(state: PostsState = postsInitialState, action: Action): PostsState {
  switch (action.type) {
    case types.LOAD_POSTS_SUCCESS: {
      const { result, author } = action.payload
      const mappedResult: Array<Post> = mapResponsePostsToInternal(author, result)
      const newPosts = uniqBy([...state.posts, ...mappedResult], 'did')
      const newState: PostsState = {
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

export const mapResponsePostsToInternal = (author: string, posts: Array<ResponsePost>): Array<Post> =>
  posts.map((post: ResponsePost) => ({
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
