import React from 'react'
import {
  View,
  ScrollView,
  Text,
} from 'react-native'
import { object } from 'prop-types'
import { Button } from 'react-native-elements'
import styles from './styles'
import { commonStyles } from '../common.styles'
import HTML from 'react-native-render-html'
import {
  ANIMATIONS_SLIDE,
  CustomTabs,
} from 'react-native-custom-tabs'

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
          <HTML html={item.text}
            ptSize={20}
            imagesInitialDimensions={{width: 200, height: 200}} />
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
