import reducer, { postsInitialState }  from './posts'
import * as types from '../constants/actionTypes'

describe('authors reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(postsInitialState)
  })

  it('should handle add posts to store', () => {
    const state = postsInitialState
    const payload = {
      author: 'test',
      result: [{
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
          langs: '{"languages":[["eng",0.609727731017601],["fra",0.144971894881937]],"detector":"Lingua-YALI:0.015","updated":1506454656}',
          personifi_tags: 'nterms:yes',
          taglist: 'win',
        },
        reply_count: 0,
        subject: 'Bam!',
        url: 'https://test.livejournal.com/1692.html',
      }]
    }
    const expectedState = {
      favoritePosts: [],
      posts: [{
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
      }]
    }
    expect(reducer(state, {
      type: types.LOAD_POSTS_SUCCESS,
      payload,
    })).toEqual(expectedState)
  })

  it('should clear posts when author was deleted', () => {

    const state = {
      favoritePosts: [{
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
        }],
      posts: [{
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
      },{
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
      }]
    }
    const expectedState = {
      favoritePosts: [],
      posts: [{
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
      }]
    }

    expect(reducer(state, {
      type: types.DELETE_AUTHOR,
      payload: 'test',
    })).toEqual(expectedState)
  })
})
