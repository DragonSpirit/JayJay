// @flow

import React from 'react'
import {
  View,
  TextInput,
  FlatList,
  Alert,
} from 'react-native'
import { AuthorsTabIcon } from '../TabIcons/AuthorsTabIcon'
import { array, func, bool } from 'prop-types'
import { Button, ListItem, Icon } from 'react-native-elements'
import styles from './styles'
import { commonStyles } from '../common.styles'

type Props = {
  authors: Array<string>,
  fetchAuthors: (author: string) => any,
  deleteAuthor: (author: string) => any,
  fetchPosts: (author: string) => any,
  authorsLoading: boolean,
}

type State = {
  name: string,
}

class AuthorsScreen extends React.PureComponent<Props, State> {

  static navigationOptions = {
    title: 'Авторы',
    tabBarIcon: AuthorsTabIcon,
  }

  static propTypes = {
    authors: array,
    fetchAuthors: func,
    deleteAuthor: func,
    fetchPosts: func,
    authorsLoading: bool,
  };

  static defaultProps = {
    authors: [],
    fetchAuthors: () => {},
    deleteAuthor: () => {},
    authorsLoading: false,
  }

  constructor(props: Props) {
    super(props)
  }

  state: State = {
    name: '',
  }

  addUser = (): void => {
    this.props.fetchAuthors(this.state.name)
      .then(this.props.fetchPosts(this.state.name))
      .catch((error: Error) => {
        switch (error.message) {
          case 'unknown user':
            Alert.alert(
              'Ошибка',
              'Такого пользователя скорее всего не существует',
            )
            break
          case 'duplicate users':
            Alert.alert(
              'Ошибка',
              'Такой пользователь уже находится в списке отслеживаемых',
            )
            break
          default:
            Alert.alert(
              'Ошибка',
              'Неизвестная ошибка, попробуйте позже',
            )
            break
        }
      })
  }

  _isEmpty = (): boolean => this.state.name.trim().length === 0

  deleteUser = (author: string) => {
    this.props.deleteAuthor(author)
  }

  emptyAuthorView = () => (
    <View style={commonStyles.container}>
      <TextInput
        placeholder='Username'
        onChangeText={name => this.setState({name})}
        style={styles.authorInput}
      />
      <Button title='Добавить пользователя'
        onPress={this.addUser}
        buttonStyle={[commonStyles.buttonStyleCommon, commonStyles.buttonStyleBig]}
        loading={this.props.authorsLoading}
        disabled={this._isEmpty()} />
    </View>
  )

  renderAuthorsItem = (data: Object) => (
    <ListItem
      title={data.item}
      rightIcon={
        <Icon name='delete'
          color='#000'
          onPress={() => this.deleteUser(data.item)}
        />
      }
    />
  )

  _keyExtractor = (item, index): string => `${index}`

  authorsListView = (): any => (
    <View style={styles.authorsContainer}>
      <View style={commonStyles.flexRow}>
        <TextInput
          placeholder='Username'
          onChangeText={(name: string) => this.setState({name})}
          style={[styles.welcome, commonStyles.flex]}
        />
        <Button title='+'
          onPress={this.addUser}
          buttonStyle={[commonStyles.buttonStyleCommon]}
          loading={this.props.authorsLoading}
          disabled={this._isEmpty()} />
      </View>
      <FlatList
        keyExtractor={this._keyExtractor}
        data={this.props.authors}
        renderItem={this.renderAuthorsItem}
        keyboardShouldPersistTaps={'always'}
      />
    </View>
  )

  render() {
    const {
      authors,
    } = this.props
    if (authors.length === 0) {
      return this.emptyAuthorView()
    }
    return this.authorsListView()
  }
}

export default AuthorsScreen
