// @flow

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PostDetailScreen from '../components/PostDetailScreen'
import { addPostToFavorites, removePostFromFavorites } from '../actions/posts'
import { isPostInFavorites } from '../helpers/utils'

import type { AppState, Dispatch } from '../reducers/ReducerTypes'

const mapStateToProps = (state: AppState): Object => ({
  isFavorite: (id: number) => {
    return isPostInFavorites(state.feed.favoritePosts, id)
  },
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addToFavorite: bindActionCreators(addPostToFavorites, dispatch),
  removeFromFavorite: bindActionCreators(removePostFromFavorites, dispatch),
})

const PostDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetailScreen)

export default PostDetailContainer
