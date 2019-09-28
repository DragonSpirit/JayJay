// @flow
import uniqBy from 'lodash.uniqby'
import * as types from '../constants/actionTypes'
import { byNewest } from '../helpers/utils'

import type { Action, Post, PostsState, ResponsePost } from '../reducers/ReducerTypes'

export const postsInitialState: PostsState = {
  posts: [],
  favoritePosts: [],
}

const storagePeriod = 7 * 24 * 60 * 60 * 1000 * 2 // store for 2 weeks

export default function postsReducer(
  state: PostsState = postsInitialState,
  action: Action,
): PostsState {
  switch (action.type) {
    case types.LOAD_POSTS_SUCCESS: {
      const { result, author } = action.payload
      const date = Date.now()
      const mappedResult: Array<Post> = mapResponsePostsToInternal(author, result)
      const newPosts = uniqBy([...state.posts, ...mappedResult], 'did')
        .sort(byNewest)
        .filter((item: Post) => date - item.ts * 1000 <= storagePeriod)
      return {
        ...state,
        posts: newPosts,
      }
    }
    case types.DELETE_AUTHOR: {
      const author = action.payload.toLowerCase()
      return {
        posts: state.posts.filter(post => post.author.toLowerCase() !== author),
        favoritePosts: state.favoritePosts.filter(post => post.author.toLowerCase() !== author),
      }
    }
    case types.ADD_POST_TO_FAVORITES: {
      const newState = { ...state }
      const { id } = action.payload
      const { favoritePosts } = newState
      const post: Array<Post> = state.posts.filter(post => post.id === id)
      favoritePosts.push(...post)
      const posts = state.posts.map(post => {
        if (post.id === id) {
          post.isFavorite = true
        }
        return post
      })
      return {
        posts,
        favoritePosts: favoritePosts.sort(byNewest),
      }
    }
    case types.REMOVE_POST_FROM_FAVORITES: {
      const { id } = action.payload
      const favorites = state.favoritePosts.filter(post => post.id !== id)
      const posts: Array<Post> = state.posts.map(post => {
        if (post.id === id) {
          post.isFavorite = false
        }
        return post
      })
      return {
        posts,
        favoritePosts: favorites,
      }
    }
    default:
      return state
  }
}

export const mapResponsePostsToInternal = (
  author: string,
  posts: Array<ResponsePost>,
): Array<Post> =>
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
