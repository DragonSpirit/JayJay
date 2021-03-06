// @flow

import { connect } from 'react-redux'
import FavoriteScreen from '../components/FavoriteScreen'

import type { AppState } from '../reducers/ReducerTypes'

const mapStateToProps = (state: AppState) => ({
  favoritePosts: state.feed.favoritePosts,
})

const FavoriteContainer = connect(mapStateToProps)(FavoriteScreen)

export default FavoriteContainer
