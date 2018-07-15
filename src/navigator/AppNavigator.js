// @flow

import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation'
// import FavoriteContainer from '../containers/FavoriteContainer'
import FeedContainer from '../containers/FeedContainer'
import AuthorsContainer from '../containers/AuthorsContainer'
import PostDetailScreen from '../components/PostDetailScreen'

const TabNavigation = createBottomTabNavigator({
  Feed: FeedContainer,
  // Favorite: FavoriteContainer,
  Authors: AuthorsContainer,
})

export const RootNavigation = createStackNavigator({
  Tabs: TabNavigation,
  Details: PostDetailScreen,
},{
  navigationOptions: {
    header: null,
  },
})
