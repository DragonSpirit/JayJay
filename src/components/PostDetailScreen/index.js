// @flow

import * as React from 'react'
import { View, ScrollView, Text, Share } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { ANIMATIONS_SLIDE, CustomTabs } from 'react-native-custom-tabs'
import HTMLView from 'react-native-htmlview'
import styles from './styles'
import { commonStyles } from '../common.styles'

type Props = {
  navigation: *,
  isFavorite: (id: number) => boolean,
  addToFavorite: (id: number) => void,
  removeFromFavorite: (id: number) => void,
}

class PostDetailScreen extends React.PureComponent<Props> {
  static navigationOptions = {
    title: 'Details',
  }

  static defaultProps = {
    addToFavorite: () => {},
    removeFromFavorite: () => {},
    isFavorite: () => false,
  }

  constructor(props: Props) {
    super(props)
  }

  openComments = () => {
    const { navigation } = this.props
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

  openLink = (link: string) => {
    CustomTabs.openURL(link, {
      toolbarColor: '#607D8B',
      enableUrlBarHiding: true,
      showPageTitle: true,
      enableDefaultShare: true,
      animations: ANIMATIONS_SLIDE,
      forceCloseOnRedirection: true,
    })
  }

  sharePost = async () => {
    const { navigation } = this.props
    const item = navigation && navigation.state && navigation.state.params
    await Share.share({
      message: item.url,
      title: item.title,
    })
  }

  toggleFavorite = (id: number) => {
    const { isFavorite, addToFavorite, removeFromFavorite } = this.props
    if (isFavorite(id)) {
      removeFromFavorite(id)
    } else {
      addToFavorite(id)
    }
  }

  render() {
    const { navigation, isFavorite } = this.props
    const item = navigation && navigation.state && navigation.state.params
    return item ? (
      <View style={commonStyles.flex}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.iconsContainer}>
            <Icon
              name='heart'
              type='font-awesome'
              underlayColor={'transparent'}
              style={styles.toggleFavoriteIcon}
              color={isFavorite(item.id) ? '#184fff' : '#000'}
              onPress={() => {
                this.toggleFavorite(item.id)
              }}
            />
            <Icon
              name='share'
              type='font-awesome'
              underlayColor={'transparent'}
              style={styles.shareIcon}
              color='#000'
              onPress={this.sharePost}
            />
          </View>
        </View>
        <ScrollView style={[commonStyles.flex, styles.scrollViewStyle]}>
          <HTMLView
            value={item.text}
            onLinkPress={link => {
              this.openLink(link)
            }}
            addLineBreaks={false}
          />
        </ScrollView>
        <Button
          title='Комментарии'
          onPress={this.openComments}
          buttonStyle={[commonStyles.buttonStyleCommon, styles.commentButton]}
        />
      </View>
    ) : null
  }
}

export default PostDetailScreen
