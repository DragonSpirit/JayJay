// @flow

import React from 'react'
import { Text, View, FlatList, RefreshControl } from 'react-native'
import { array, func, bool, object } from 'prop-types'
import { FeedTabIcon } from '../TabIcons/FeedTabIcon'
import { Button, Card } from 'react-native-elements'

import styles from './styles'
import { commonStyles } from '../common.styles'

type Props = {
  authors: Array<string>,
  fetchPosts: (author: string) => any,
  feed: Array<Object>,
  navigation: Object,
  isPostsLoading: boolean,
}

class FeedScreen extends React.PureComponent<Props> {

  static navigationOptions = {
    title: 'Feed',
    tabBarIcon: FeedTabIcon,
  }

  static propTypes = {
    authors: array,
    fetchPosts: func,
    feed: array,
    navigation: object,
    isPostsLoading: bool,
  };

  constructor(props: Props) {
    super(props)
  }

  emptyAuthorView = () => (
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
      <Card
        title={item.title}
        image={{uri: item.img}}>
        <Text style={styles.feedText} numberOfLines={3}>
          {item.text}
        </Text>
        <Button
          icon={{name: 'code'}}
          backgroundColor='#03A9F4'
          fontFamily='Lato'
          buttonStyle={styles.readPostBtn}
          title='Читать далее'
          onPress={() => this.props.navigation.navigate('Details', item)} />
      </Card>
    )
  }

  _onRefresh = () => {
    const { authors } = this.props
    authors.forEach((author: string) => {
      this.props.fetchPosts(author)
    })
  }

  _keyExtractor = (item, index) => `${item.did}`

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
      <View style={commonStyles.container}>
        <FlatList
          data={feed}
          renderItem={this._renderItem}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isPostsLoading}
              onRefresh={this._onRefresh}
            />
          }
          keyExtractor={this._keyExtractor}
        />
      </View>)
  }
}

export default FeedScreen
