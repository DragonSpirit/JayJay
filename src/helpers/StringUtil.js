// @flow

export const parseTitle = (text: string): string => {
  return `${text.replace(/<img[^>]*>/g,'').slice(0, 150)}...`
}
