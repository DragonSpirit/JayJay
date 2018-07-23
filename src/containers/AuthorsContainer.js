// @flow

import AuthorsScreen from '../components/AuthorsScreen'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { requestAddAuthor, deleteAuthor as deleteAction } from '../actions/authors'

import type { AppState, Dispatch } from '../reducers/ReducerTypes'

const mapStateToProps = (state: AppState): Object => ({
  authors: state.authors,
  authorsLoading: state.common.authorsLoading,
})

const mapDispatchToProps = (dispatch: Dispatch): Object => ({
  fetchAuthors: bindActionCreators(requestAddAuthor, dispatch),
  deleteAuthor: author => { dispatch(deleteAction(author)) },
})

const FeedContainer = connect(mapStateToProps, mapDispatchToProps)(AuthorsScreen)

export default FeedContainer
