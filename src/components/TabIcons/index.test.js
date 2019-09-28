import React from 'react'
import renderer from 'react-test-renderer'

import { AuthorsTabIcon } from './AuthorsTabIcon'
import { FavoriteTabIcon } from './FavoriteTabIcon'
import { FeedTabIcon } from './FeedTabIcon'

describe('TabIcons', () => {
  it('AuthorsTabIcon renders correctly', () => {
    const tree = renderer.create(<AuthorsTabIcon />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('FavoriteTabIcon renders correctly', () => {
    const tree = renderer.create(<FavoriteTabIcon />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('FeedTabIcon renders correctly', () => {
    const tree = renderer.create(<FeedTabIcon />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
