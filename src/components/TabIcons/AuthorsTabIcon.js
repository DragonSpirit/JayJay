import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'

export const AuthorsTabIcon = ({ focused }) => (<Icon name='tag-faces' color={focused ? '#184fff' : '#000'} />)

AuthorsTabIcon.propTypes = {
  focused: PropTypes.bool,
}

AuthorsTabIcon.defaultProps = {
  focused: false,
}
