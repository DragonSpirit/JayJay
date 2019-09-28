// @flow

import type { Post } from '../reducers/ReducerTypes'

export const byNewest = (a: Post, b: Post) => b.ts - a.ts

export const isPostInFavorites = (posts: Array<Post>, postId: number) => {
  return posts.filter(post => post.id === postId).length > 0
}
