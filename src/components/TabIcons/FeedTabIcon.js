import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'

export const FeedTabIcon = ({ focused }) => (<Icon name='format-align-justify' color={focused ? '#184fff' : '#000'} />)

FeedTabIcon.propTypes = {
  focused: PropTypes.bool,
}
