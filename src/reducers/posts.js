// @flow

import * as types from '../constants/actionTypes'
import type {Action, Post, PostsState, ResponsePost} from '../reducers/ReducerTypes'
import uniqBy from 'lodash.uniqby'
import {sortPostsByNewest} from '../helpers/utils'

export const postsInitialState: PostsState = {
  posts: [],
  favoritePosts: [],
}


export default function postsReducer(state: PostsState = postsInitialState, action: Action): PostsState {
  switch (action.type) {
    case types.LOAD_POSTS_SUCCESS: {
      const { result, author } = action.payload
      // const date = +new Date()
      const mappedResult: Array<Post> = mapResponsePostsToInternal(author, result)
      const newPosts = uniqBy([...state.posts, ...mappedResult], 'did')
        .sort((a, b) => b.ts - a.ts)
        // .filter((item: Post) => date - item.did <= (1000 * 7 * 24 * 60 * 60) * 2) // store for 2 weeks
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
      const newState = {...state}
      const { id } = action.payload
      const {favoritePosts} = newState
      const post = state.posts.filter(post => post.id === id)
      favoritePosts.push(...post)
      const posts = state.posts.map(post => {
        if (post.id === id) {
          post.isFavorite = true
        }
        return post
      })
      return {
        posts,
        favoritePosts: sortPostsByNewest(favoritePosts),
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
