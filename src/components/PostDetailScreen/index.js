import React from 'react'
import {
  View,
  ScrollView,
  Dimensions,
  Text,
} from 'react-native'
import { object } from 'prop-types'
import styles from './styles'
import { commonStyles } from '../common.styles'
import HTML from 'react-native-render-html'

class PostDetailScreen extends React.PureComponent {

  static navigationOptions = {
    title: 'Details',
  }

  static propTypes = {
    navigation: object,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {
      navigation,
    } = this.props
    const item = navigation && navigation.state && navigation.state.params
    return item ? (
      <View style={commonStyles.flex}>
        <Text style={styles.title}>{item.title}</Text>
        <ScrollView style={[commonStyles.flex, styles.scrollViewStyle]}
          contentContaierStyle={styles.scrollViewContentStyle}>
          <HTML html={item.text} imagesMaxWidth={Dimensions.get('window').width} ptSize={20} />
        </ScrollView>
      </View>
    ) : null
  }

}
export default PostDetailScreen
