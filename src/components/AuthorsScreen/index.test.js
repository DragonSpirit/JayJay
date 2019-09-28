import React from 'react'
import AuthorsScreen from './'
import renderer from 'react-test-renderer'

const fetch = jest.fn()

describe('AuthorsScreen', () => {
  it('empty renders correctly', () => {
    const tree = renderer.create(<AuthorsScreen fetchPosts={fetch} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('non empty renders correctly', () => {
    const tree = renderer.create(<AuthorsScreen authors={['test']} fetchPosts={fetch} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should delete author', () => {
    const deleteAuthor = jest.fn()
    const tree = renderer.create(
      <AuthorsScreen authors={['test']} deleteAuthor={deleteAuthor} fetchPosts={fetch} />,
    )
    tree.getInstance().deleteUser('test')
    expect(deleteAuthor).toHaveBeenCalledWith('test')
  })

  it('should check test input', () => {
    const instanceOf = renderer.create(<AuthorsScreen fetchPosts={fetch} />).getInstance()
    instanceOf.handleChangeName('test')
    expect(instanceOf.state.name).toEqual('test')
  })

  it('should call addUser', () => {
    const addUser = jest.fn()
    const instanceOf = renderer.create(<AuthorsScreen fetchPosts={fetch} />).getInstance()
    instanceOf.addUser = addUser
    instanceOf.handleChangeName('test')
    instanceOf.onSubmit()
    expect(addUser).toHaveBeenCalled()
  })

  it('should check that isEmpty returns true', () => {
    const instanceOf = renderer.create(<AuthorsScreen fetchPosts={fetch} />).getInstance()
    expect(instanceOf._isEmpty()).toBe(true)
  })

  it('should check that isEmpty returns false with state data', () => {
    const instanceOf = renderer.create(<AuthorsScreen fetchPosts={fetch} />).getInstance()
    instanceOf.handleChangeName('test')
    expect(instanceOf._isEmpty()).toBe(false)
  })

  it('should check that isEmpty returns true with spaces in name', () => {
    const instanceOf = renderer.create(<AuthorsScreen fetchPosts={fetch} />).getInstance()
    instanceOf.handleChangeName('     ')
    expect(instanceOf._isEmpty()).toBe(true)
  })

  it('should call fetchAuthors', () => {
    const fetchAuthors = jest.fn().mockImplementation(() => new Promise.resolve())
    const instanceOf = renderer
      .create(<AuthorsScreen fetchPosts={fetch} fetchAuthors={fetchAuthors} />)
      .getInstance()
    instanceOf.addUser()
    expect(fetchAuthors).toHaveBeenCalled()
  })
})
