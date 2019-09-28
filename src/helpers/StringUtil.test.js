import { parseTitle } from './StringUtil'

describe('StringUtils', () => {
  it('should cut long text to 150 chars', () => {
    const text =
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient.'
    const expectedText =
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p'
    expect(parseTitle(text)).toEqual(expectedText)
  })

  it('cut img tag from text', () => {
    const text = 'test <img src="https://google.com" alt="test"/> tost'
    const expectedText = 'test  tost'
    expect(parseTitle(text)).toEqual(expectedText)
  })
})
