import FavoriteScreen from '../components/FavoriteScreen'
import { connect } from 'react-redux'
const mapStateToProps = state => ({
  favoritePosts: state.feed.favoritePosts,
})

const FavoriteContainer = connect(mapStateToProps)(FavoriteScreen)

export default FavoriteContainer
