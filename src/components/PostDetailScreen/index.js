import React from 'react'
import {
  View,
  ScrollView,
  Text,
} from 'react-native'
import { object, func } from 'prop-types'
import { Button, Icon } from 'react-native-elements'
import styles from './styles'
import { commonStyles } from '../common.styles'
import { ANIMATIONS_SLIDE, CustomTabs } from 'react-native-custom-tabs'
import HTMLView from 'react-native-htmlview'

class PostDetailScreen extends React.PureComponent {

  static navigationOptions = {
    title: 'Details',
  }

  static propTypes = {
    navigation: object,
    isFavorite: func,
    addToFavorite: func,
    removeFromFavorite: func,
  }

  constructor(props) {
    super(props)
  }

  openComments = () => {
    const {
      navigation,
    } = this.props
    const item = navigation && navigation.state && navigation.state.params
    CustomTabs.openURL(`${item.url}#comments`, {
      toolbarColor: '#607D8B',
      enableUrlBarHiding: true,
      showPageTitle: true,
      enableDefaultShare: true,
      animations: ANIMATIONS_SLIDE,
      headers: {
        'my-custom-header': item.title,
      },
      forceCloseOnRedirection: true,
    })
  }

  openLink = link => {
    CustomTabs.openURL(link, {
      toolbarColor: '#607D8B',
      enableUrlBarHiding: true,
      showPageTitle: true,
      enableDefaultShare: true,
      animations: ANIMATIONS_SLIDE,
      forceCloseOnRedirection: true,
    })
  }

  toggleFavorite = id => {
    const {isFavorite, addToFavorite, removeFromFavorite} = this.props
    if (isFavorite(id)) {
      removeFromFavorite(id)
    } else {
      addToFavorite(id)
    }
  }

  render() {
    const {
      navigation,
      isFavorite,
    } = this.props
    const item = navigation && navigation.state && navigation.state.params
    return item ? (
      <View style={commonStyles.flex}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Icon
            name='heart'
            type='font-awesome'
            underlayColor={'transparent'}
            style={styles.toggleFavoriteIcon}
            color={isFavorite(item.id) ? '#184fff' : '#000'}
            onPress={() => {this.toggleFavorite(item.id)}} />
        </View>
        <ScrollView style={[commonStyles.flex, styles.scrollViewStyle]}>
          <HTMLView value={item.text}
            onLinkPress={link => {this.openLink(link)}} addLineBreaks={false} />
        </ScrollView>
        <Button title='Комментарии'
          onPress={this.openComments}
          buttonStyle={[commonStyles.buttonStyleCommon, styles.commentButton]}
        />
      </View>
    ) : null
  }

}
export default PostDetailScreen
