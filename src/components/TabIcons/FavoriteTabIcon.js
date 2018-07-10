import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'

export const FavoriteTabIcon = ({ focused }) => (<Icon name='star' color={focused ? '#184fff' : '#000'} />)

FavoriteTabIcon.propTypes = {
  focused: PropTypes.bool,
}
