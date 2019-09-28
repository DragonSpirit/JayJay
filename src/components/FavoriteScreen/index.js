// @flow

import React from 'react'
import { Text, View, FlatList, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { Button, Card, Avatar } from 'react-native-elements'
import HTML from 'react-native-render-html'
import { FavoriteTabIcon } from '../TabIcons/FavoriteTabIcon'
import { parseTitle } from '../../helpers/StringUtil'
import styles from './styles'
import { commonStyles } from '../common.styles'

import type { Post } from '../../reducers/ReducerTypes'
import type { RefObject } from 'react-native/Libraries/Renderer/shims/ReactTypes'

type State = {
  isUpButtonShowed: boolean,
  date: Date,
}

type Props = {
  favoritePosts: Array<Post>,
  navigation: Object,
  isPostsLoading?: boolean,
}

class FavoriteScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Избранное',
    tabBarIcon: FavoriteTabIcon,
  }

  static defaultProps = {
    favoritePosts: [],
  }

  flatListRef: RefObject
  scrollToTop: boolean = false
  listeners = []

  constructor(props: Props) {
    super(props)
    this.state = {
      isUpButtonShowed: false,
      date: new Date(), // dirty hack, react not rerender after update store (redux or react-navigation issue)
    }
  }

  componentDidMount(): void {
    if (this.props.navigation) {
      this.listeners = [
        this.props.navigation.addListener('didFocus', () => {
          this.setState({
            date: new Date(),
          })
        }),
      ]
    }
  }

  componentWillUnmount(): void {
    this.listeners.forEach(item => item.remove())
  }

  handleClickToFeed = () => this.props.navigation.navigate('Feed')

  reloadPostsView = () => (
    <View style={commonStyles.container}>
      <Text style={styles.welcome}>Список избранного пуст</Text>
      <Button
        title='Перейти к постам'
        onPress={this.handleClickToFeed}
        buttonStyle={[commonStyles.buttonStyleCommon, commonStyles.buttonStyleBig]}
      />
    </View>
  )

  _renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Details', item)}>
        <Card title={`${item.author} \n ${item.title}`} image={item.img ? { uri: item.img } : null}>
          <HTML html={`${parseTitle(item.text)}...`} style={styles.feedText} />
        </Card>
      </TouchableWithoutFeedback>
    )
  }

  _keyExtractor = (item: Post) => `${item.did}`

  _onScroll = event => {
    if (this.scrollToTop) {
      return
    }
    if (
      event.nativeEvent.contentOffset.y > Dimensions.get('window').height &&
      !this.state.isUpButtonShowed
    ) {
      this.setState({ isUpButtonShowed: true })
    }
  }

  _scrollToTop = () => {
    this.scrollToTop = true
    this.flatListRef.scrollToIndex({ animated: true, index: 0 })
    this.setState({ isUpButtonShowed: false })
    setTimeout(() => {
      this.scrollToTop = false
    }, 200)
  }

  render() {
    const { favoritePosts } = this.props
    if (favoritePosts.length === 0) return this.reloadPostsView()
    return (
      <View style={commonStyles.flex}>
        <View style={commonStyles.container}>
          <FlatList
            ref={ref => {
              this.flatListRef = ref
            }}
            data={favoritePosts}
            renderItem={this._renderItem}
            onScroll={this._onScroll}
            scrollEventThrottle={64}
            keyExtractor={this._keyExtractor}
            extraData={this.state.date}
          />
        </View>
        {this.state.isUpButtonShowed ? (
          <View style={styles.scrollToTopView}>
            <Avatar
              onPress={this._scrollToTop}
              rounded
              icon={{ name: 'arrow-drop-up' }}
              width={40}
              height={40}
            />
          </View>
        ) : null}
      </View>
    )
  }
}

export default FavoriteScreen
