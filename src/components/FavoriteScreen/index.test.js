import React from 'react'
import renderer from 'react-test-renderer'

import FavoriteScreen from './'

const navigation = {
  navigate: jest.fn(),
  addListener: jest.fn(),
}

describe('FeedScreen', () => {
  beforeAll(() => {
    jest.mock('Dimensions', () => ({ get: jest.fn().mockReturnValue({ width: 100, height: 100 }) }))
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.resetAllMocks()
    jest.useRealTimers()
  })

  it('renders correctly', () => {
    const tree = renderer.create(<FavoriteScreen  navigation={navigation}/>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with empty feed but exists authors', () => {
    const tree = renderer.create(<FavoriteScreen navigation={navigation} authors={['test']} feed={[]} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with non empty feed and authors', () => {
    const feed = [
      {
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
    ]
    const tree = renderer.create(<FavoriteScreen navigation={navigation} authors={['test']} feed={feed} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should call navigate function', () => {
    const navigation = {
      navigate: jest.fn(),
      addListener: jest.fn(),
    }
    const instanceOf = renderer
      .create(<FavoriteScreen navigation={navigation} favoritePosts={[]} />)
      .getInstance()
    instanceOf.handleClickToFeed()
    expect(navigation.navigate).toHaveBeenCalled()
  })

  it('should not change state if scrollToTop is true', () => {
    const instanceOf = renderer
      .create(<FavoriteScreen navigation={navigation} favoritePosts={[]} />)
      .getInstance()
    instanceOf.scrollToTop = true
    instanceOf._onScroll()
    expect(instanceOf.state.isUpButtonShowed).toEqual(false)
  })

  it('should change state if scrollToTop is false', () => {
    const instanceOf = renderer
      .create(<FavoriteScreen navigation={navigation} favoritePosts={[]} />)
      .getInstance()
    const event = {
      nativeEvent: {
        contentOffset: {
          y: 1000,
        },
      },
    }
    instanceOf._onScroll(event)
    expect(instanceOf.state.isUpButtonShowed).toEqual(true)
  })

  it('should change scrollToTop after timeout', () => {
    const flatListRef = {
      scrollToIndex: jest.fn(),
    }
    const instanceOf = renderer
      .create(<FavoriteScreen navigation={navigation} favoritePosts={[]} />)
      .getInstance()
    instanceOf.flatListRef = flatListRef
    instanceOf._scrollToTop()
    expect(instanceOf.scrollToTop).toEqual(true)
    jest.advanceTimersByTime(200)
    expect(instanceOf.scrollToTop).toEqual(false)
  })
})
