import API, { client } from './API'

describe('API tests', () => {
  const mock = jest.fn()
  const originalCall = client.call

  beforeAll(() => {
    client.call = mock
  })

  afterAll(() => {
    client.call = originalCall
  })

  it('should call client method', function() {
    const callback = () => {}
    const params = {
      journal: 'author',
      auth_method: 'noauth',
      selecttype: 'lastn',
      howmany: 20,
    }
    API.getevents(params, callback)
    expect(mock).toBeCalledWith('LJ.XMLRPC.getevents', [{ ...params, ver: 1 }], callback)
  })
})
