import React from 'react'
import PostDetailScreen from './'

import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

const navigation = {
  state: {
    params: {
      author: 'test',
      id: 1,
      did: 1,
      title: 'Test',
      text: 'Test',
      ts: 1,
      url: 'local.url',
      tags: 'tag',
      isFavorite: false,
    },
  },
}

describe('PostDetailScreen', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<PostDetailScreen navigation={navigation} />).toJSON()
    expect(
      tree.children['0'].children['1'].children['0'].children['0'].props.style['0'].color,
    ).toBe('#000')
    expect(tree).toMatchSnapshot()
  })

  it('renders favorite post correctly', () => {
    const isFavorite = () => true
    const tree = renderer
      .create(<PostDetailScreen navigation={navigation} isFavorite={isFavorite} />)
      .toJSON()
    expect(
      tree.children['0'].children['1'].children['0'].children['0'].props.style['0'].color,
    ).toBe('#184fff')
    expect(tree).toMatchSnapshot()
  })

  it('should remove from favorite called', () => {
    const removeFromFavorite = jest.fn()
    const isFavorite = () => true
    const wrapper = shallow(
      <PostDetailScreen
        navigation={navigation}
        isFavorite={isFavorite}
        removeFromFavorite={removeFromFavorite}
      />,
    )
    wrapper.instance().toggleFavorite(navigation.state.params.id)
    expect(removeFromFavorite).toBeCalled()
  })

  it('should add to favorite called', () => {
    const addToFavorite = jest.fn()
    const wrapper = shallow(
      <PostDetailScreen navigation={navigation} addToFavorite={addToFavorite} />,
    )
    wrapper.instance().toggleFavorite(navigation.state.params.id)
    expect(addToFavorite).toBeCalled()
  })
})
