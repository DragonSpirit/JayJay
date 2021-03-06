import reducer, { postsInitialState } from './posts'
import * as types from '../constants/actionTypes'
import * as posts from '../actions/posts'

import type { PostsState } from './ReducerTypes'

describe('posts reducer', () => {
  beforeEach(() => {
    this.timestamp = 1506430000000
    global.Date.now = jest.fn().mockImplementation(() => this.timestamp)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(postsInitialState)
  })

  it('should handle add posts to store', () => {
    const state = postsInitialState
    const payload = {
      author: 'test',
      result: [
        {
          anum: 156,
          can_comment: 0,
          ditemid: 1692,
          event: 'test',
          event_timestamp: 1506429420,
          eventtime: '2017-09-26 12:37:00',
          itemid: 6,
          logtime: '2017-09-26 19:37:35',
          props: {
            give_features: 1,
            interface: 'web',
            langs:
              '{"languages":[["eng",0.609727731017601],["fra",0.144971894881937]],"detector":"Lingua-YALI:0.015","updated":1506454656}',
            personifi_tags: 'nterms:yes',
            taglist: 'win',
          },
          reply_count: 0,
          subject: 'Bam!',
          url: 'https://test.livejournal.com/1692.html',
        },
      ],
    }
    const expectedState = {
      favoritePosts: [],
      posts: [
        {
          author: 'test',
          id: 6,
          did: 1692,
          title: 'Bam!',
          text: 'test',
          ts: 1506429420,
          url: 'https://test.livejournal.com/1692.html',
          img: undefined,
          tags: 'win',
          isFavorite: false,
        },
      ],
    }
    expect(
      reducer(state, {
        type: types.LOAD_POSTS_SUCCESS,
        payload,
      }),
    ).toEqual(expectedState)
  })

  it('should clear posts when author was deleted', () => {
    const state = {
      favoritePosts: [
        {
          author: 'test',
          id: 6,
          did: 1692,
          title: 'Bam!',
          text: 'test',
          ts: 1506429420,
          url: 'https://test.livejournal.com/1692.html',
          img: undefined,
          tags: 'win',
          isFavorite: true,
        },
      ],
      posts: [
        {
          author: 'test',
          id: 6,
          did: 1692,
          title: 'Bam!',
          text: 'test',
          ts: 1506429420,
          url: 'https://test.livejournal.com/1692.html',
          img: undefined,
          tags: 'win',
          isFavorite: true,
        },
        {
          author: 'test1',
          id: 6,
          did: 1692,
          title: 'Bam2!',
          text: 'test',
          ts: 1506429420,
          url: 'https://test.livejournal.com/1692.html',
          img: undefined,
          tags: 'win',
          isFavorite: true,
        },
      ],
    }
    const expectedState = {
      favoritePosts: [],
      posts: [
        {
          author: 'test1',
          id: 6,
          did: 1692,
          title: 'Bam2!',
          text: 'test',
          ts: 1506429420,
          url: 'https://test.livejournal.com/1692.html',
          img: undefined,
          tags: 'win',
          isFavorite: true,
        },
      ],
    }

    expect(
      reducer(state, {
        type: types.DELETE_AUTHOR,
        payload: 'test',
      }),
    ).toEqual(expectedState)
  })

  it('should clear posts when author was deleted with different case', () => {
    const state = {
      favoritePosts: [
        {
          author: 'test',
          id: 6,
          did: 1692,
          title: 'Bam!',
          text: 'test',
          ts: 1506429420,
          url: 'https://test.livejournal.com/1692.html',
          img: undefined,
          tags: 'win',
          isFavorite: true,
        },
      ],
      posts: [
        {
          author: 'test',
          id: 6,
          did: 1692,
          title: 'Bam!',
          text: 'test',
          ts: 1506429420,
          url: 'https://test.livejournal.com/1692.html',
          img: undefined,
          tags: 'win',
          isFavorite: true,
        },
        {
          author: 'test1',
          id: 6,
          did: 1692,
          title: 'Bam2!',
          text: 'test',
          ts: 1506429420,
          url: 'https://test.livejournal.com/1692.html',
          img: undefined,
          tags: 'win',
          isFavorite: true,
        },
      ],
    }
    const expectedState = {
      favoritePosts: [],
      posts: [
        {
          author: 'test1',
          id: 6,
          did: 1692,
          title: 'Bam2!',
          text: 'test',
          ts: 1506429420,
          url: 'https://test.livejournal.com/1692.html',
          img: undefined,
          tags: 'win',
          isFavorite: true,
        },
      ],
    }

    expect(
      reducer(state, {
        type: types.DELETE_AUTHOR,
        payload: 'TeSt',
      }),
    ).toEqual(expectedState)
  })

  it('should sort post from multiple authors by date ', () => {
    const state = postsInitialState
    const payloadTest = {
      author: 'test',
      result: [
        {
          anum: 156,
          can_comment: 0,
          ditemid: 1692,
          event: 'test',
          event_timestamp: 1506429420,
          eventtime: '2017-09-26 12:37:00',
          itemid: 6,
          logtime: '2017-09-26 19:37:35',
          props: {
            give_features: 1,
            interface: 'web',
            langs:
              '{"languages":[["eng",0.609727731017601],["fra",0.144971894881937]],"detector":"Lingua-YALI:0.015","updated":1506454656}',
            personifi_tags: 'nterms:yes',
            taglist: 'win',
          },
          reply_count: 0,
          subject: 'Bam!',
          url: 'https://test.livejournal.com/1692.html',
        },
      ],
    }
    const payloadTost = {
      author: 'tost',
      result: [
        {
          anum: 155,
          can_comment: 0,
          ditemid: 1690,
          event: 'test',
          event_timestamp: 1506430000,
          eventtime: '2017-09-26 12:46:00',
          itemid: 6,
          logtime: '2017-09-26 19:346:35',
          props: {
            give_features: 1,
            interface: 'web',
            langs:
              '{"languages":[["eng",0.609727731017601],["fra",0.144971894881937]],"detector":"Lingua-YALI:0.015","updated":1506454656}',
            personifi_tags: 'nterms:yes',
            taglist: 'win',
          },
          reply_count: 0,
          subject: 'Bam!',
          url: 'https://test.livejournal.com/1692.html',
        },
      ],
    }
    const expectedState = {
      favoritePosts: [],
      posts: [
        {
          author: 'tost',
          id: 6,
          did: 1690,
          title: 'Bam!',
          text: 'test',
          ts: 1506430000,
          url: 'https://test.livejournal.com/1692.html',
          img: undefined,
          tags: 'win',
          isFavorite: false,
        },
        {
          author: 'test',
          id: 6,
          did: 1692,
          title: 'Bam!',
          text: 'test',
          ts: 1506429420,
          url: 'https://test.livejournal.com/1692.html',
          img: undefined,
          tags: 'win',
          isFavorite: false,
        },
      ],
    }
    const tempStore = reducer(state, {
      type: types.LOAD_POSTS_SUCCESS,
      payload: payloadTest,
    })
    expect(
      reducer(tempStore, {
        type: types.LOAD_POSTS_SUCCESS,
        payload: payloadTost,
      }),
    ).toEqual(expectedState)
  })

  it('should mark post as favorite', () => {
    const originalState: PostsState = {
      posts: [
        {
          author: 'test',
          id: 1,
          did: 1,
          title: 'title',
          text: 'text',
          ts: 1,
          url: 'http://mockurl.local',
          img: '',
          tags: '',
          isFavorite: false,
        },
      ],
      favoritePosts: [],
    }
    const expectedState: PostsState = {
      posts: [
        {
          author: 'test',
          id: 1,
          did: 1,
          title: 'title',
          text: 'text',
          ts: 1,
          url: 'http://mockurl.local',
          img: '',
          tags: '',
          isFavorite: true,
        },
      ],
      favoritePosts: [
        {
          author: 'test',
          id: 1,
          did: 1,
          title: 'title',
          text: 'text',
          ts: 1,
          url: 'http://mockurl.local',
          img: '',
          tags: '',
          isFavorite: true,
        },
      ],
    }
    expect(reducer(originalState, posts.addPostToFavorites(1))).toEqual(expectedState)
  })

  it('should unmark post as favorite', () => {
    const originalState: PostsState = {
      posts: [
        {
          author: 'test',
          id: 1,
          did: 1,
          title: 'title',
          text: 'text',
          ts: 1,
          url: 'http://mockurl.local',
          img: '',
          tags: '',
          isFavorite: true,
        },
      ],
      favoritePosts: [
        {
          author: 'test',
          id: 1,
          did: 1,
          title: 'title',
          text: 'text',
          ts: 1,
          url: 'http://mockurl.local',
          img: '',
          tags: '',
          isFavorite: true,
        },
      ],
    }
    const expectedState: PostsState = {
      posts: [
        {
          author: 'test',
          id: 1,
          did: 1,
          title: 'title',
          text: 'text',
          ts: 1,
          url: 'http://mockurl.local',
          img: '',
          tags: '',
          isFavorite: false,
        },
      ],
      favoritePosts: [],
    }
    expect(reducer(originalState, posts.removePostFromFavorites(1))).toEqual(expectedState)
  })
})
