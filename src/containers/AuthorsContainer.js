// @flow

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AuthorsScreen from '../components/AuthorsScreen'
import { requestAddAuthor, deleteAuthor as deleteAction } from '../actions/authors'
import { requestLoadPosts } from '../actions/posts'

import type { AppState, Dispatch } from '../reducers/ReducerTypes'

const mapStateToProps = (state: AppState): Object => ({
  authors: state.authors,
  authorsLoading: state.common.authorsLoading,
})

const mapDispatchToProps = (dispatch: Dispatch): Object => ({
  fetchAuthors: bindActionCreators(requestAddAuthor, dispatch),
  deleteAuthor: bindActionCreators(deleteAction, dispatch),
  fetchPosts: bindActionCreators(requestLoadPosts, dispatch),
})

const FeedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorsScreen)

export default FeedContainer
