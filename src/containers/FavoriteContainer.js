import FavoriteScreen from '../components/FavoriteScreen'
import { connect } from 'react-redux'
const mapStateToProps = state => {
  return {
    favoritePosts: state.feed.favoritePosts,
  }
}

const FeedContainer = connect(mapStateToProps)(FavoriteScreen)

export default FeedContainer
