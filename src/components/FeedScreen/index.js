// @flow

import React from 'react'
import { Text, View, FlatList, RefreshControl, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { array, func, bool, object } from 'prop-types'
import { FeedTabIcon } from '../TabIcons/FeedTabIcon'
import { Button, Card, Avatar } from 'react-native-elements'
import HTML from 'react-native-render-html'
import { parseTitle } from '../../helpers/StringUtil'
import styles from './styles'
import { commonStyles } from '../common.styles'
import type { Post } from '../../reducers/ReducerTypes'
import type {RefObject} from 'react-native/Libraries/Renderer/shims/ReactTypes'

type Props = {
  authors: Array<string>,
  fetchPosts: (author: string) => any,
  feed: Array<Object>,
  navigation: Object,
  isPostsLoading: boolean,
}

type State = {
  isUpButtonShowed: boolean
}

class FeedScreen extends React.PureComponent<Props, State> {

  static navigationOptions = {
    title: 'Лента',
    tabBarIcon: FeedTabIcon,
  }

  static propTypes = {
    authors: array,
    fetchPosts: func,
    feed: array,
    navigation: object,
    isPostsLoading: bool,
  };

  static defaultProps = {
    authors: [],
  }

  flatListRef: RefObject = null;
  scrollToTop = false;

  constructor(props: Props) {
    super(props)
    this.state = {
      isUpButtonShowed: false,
    }
  }

  emptyAuthorView = (): React$Element<any> => (
    <View style={commonStyles.container}>
      <Text style={styles.welcome}>
          Похоже на то, что вы никого не выбрали для отслеживания
      </Text>
      <Button title='Выбрать пользователя'
        onPress={() => this.props.navigation.navigate('Authors')}
        buttonStyle={[commonStyles.buttonStyleCommon, commonStyles.buttonStyleBig]} />
    </View>
  )

  reloadPostsView = () => (
    <View style={commonStyles.container}>
      <Text style={styles.welcome}>
          Возможно возникли проблемы с загрузкой ленты
      </Text>
      <Button title='Обновить'
        onPress={this._onRefresh}
        loading={this.props.isPostsLoading}
        buttonStyle={[commonStyles.buttonStyleCommon, commonStyles.buttonStyleBig]} />
    </View>
  )

  componentDidMount() {
    const { authors } = this.props
    authors.forEach((author: string) => {
      this.props.fetchPosts(author)
    })
  }

  _renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Details', item)}>
        <Card
          title={`${item.author} \n ${item.title}`}
          image={item.img ? {uri: item.img} : null}>
          <HTML html={`${parseTitle(item.text)}...`} style={styles.feedText} />
        </Card>
      </TouchableWithoutFeedback>
    )
  }

  _onRefresh = () => {
    const { authors } = this.props
    authors.forEach((author: string) => {
      this.props.fetchPosts(author)
    })
  }

  _keyExtractor = (item: Post) => `${item.did}`

  _onScroll = event => {
    if (this.scrollToTop) {
      return
    }
    if (event.nativeEvent.contentOffset.y > Dimensions.get('window').height && !this.state.isUpButtonShowed) {
      this.setState({isUpButtonShowed: true})
    }
  }

  _scrollToTop = () => {
    this.scrollToTop = true
    this.flatListRef.scrollToIndex({animated: true, index: 0})
    this.setState({isUpButtonShowed: false})
    setTimeout(() => {this.scrollToTop = false}, 200)
  }

  render() {
    const {
      authors,
      feed,
    } = this.props
    if (authors.length === 0)
      return this.emptyAuthorView()
    if (feed.length === 0)
      return this.reloadPostsView()
    return (
      <View style={commonStyles.flex}>
        <View style={commonStyles.container}>
          <FlatList
            ref={ref => {this.flatListRef = ref}}
            data={feed}
            renderItem={this._renderItem}
            onScroll={this._onScroll}
            scrollEventThrottle={64}
            refreshControl={
              <RefreshControl
                refreshing={this.props.isPostsLoading}
                onRefresh={this._onRefresh}
              />
            }
            keyExtractor={this._keyExtractor}
          />
        </View>
        {this.state.isUpButtonShowed ?
          <View style={styles.scrollToTopView}>
            <Avatar onPress={this._scrollToTop}
              rounded
              icon={{name: 'arrow-drop-up'}}
              width={40}
              height={40}
            />
          </View> : null
        }
      </View>)
  }
}

export default FeedScreen
