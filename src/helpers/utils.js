export const sortPostsByNewest = posts => {
  return posts.sort((a, b) => b.ts - a.ts)
}

export const isPostInFavorites = (posts, postId) => {
  return posts.filter(post => post.id === postId).length > 0
}