import React from 'react'
import { View, Text } from 'react-native'
import { FavoriteTabIcon } from './TabIcons/FavoriteTabIcon'
import PropTypes from 'prop-types'
import { commonStyles } from './common.styles'

class FavoriteScreen extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={commonStyles.container}>
        <Text>
            Favorite posts
        </Text>
      </View>
    )
  }

  static navigationOptions = {
    title: 'Favorites',
    tabBarIcon: FavoriteTabIcon,
  }
  
  static propTypes = {
    posts: PropTypes.array,
  }

}
export default FavoriteScreen
