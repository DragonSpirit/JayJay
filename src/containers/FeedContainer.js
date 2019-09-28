// @flow

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FeedScreen from '../components/FeedScreen'
import { requestLoadPosts } from '../actions/posts'

import type { AppState, Dispatch } from '../reducers/ReducerTypes'

const mapStateToProps = (state: AppState) => ({
  feed: state.feed.posts,
  authors: state.authors,
  isPostsLoading: state.common.authorsLoading,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchPosts: bindActionCreators(requestLoadPosts, dispatch),
})

const FeedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedScreen)

export default FeedContainer
