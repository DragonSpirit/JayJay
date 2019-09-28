// @flow

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import FavoriteContainer from '../containers/FavoriteContainer'
import FeedContainer from '../containers/FeedContainer'
import AuthorsContainer from '../containers/AuthorsContainer'
import PostDetailContainer from '../containers/PostDetailsContainer'

const TabNavigation = createBottomTabNavigator(
  {
    Feed: FeedContainer,
    Authors: AuthorsContainer,
    Favorite: FavoriteContainer,
  },
  {},
)

export const RootNavigation = createStackNavigator(
  {
    Tabs: TabNavigation,
    Details: PostDetailContainer,
  },
  {
    navigationOptions: {
      header: null,
    },
  },
)
