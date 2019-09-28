import xmlrpc from 'react-native-xmlrpc'
export const client = new xmlrpc('https://www.livejournal.com/interface/xmlrpc')

export const methods = [
  'checkfriends',
  'consolecommand',
  'editevent',
  'editfriendgroups',
  'editfriends',
  'friendof',
  'getchallenge',
  'getdaycounts',
  'getevents',
  'getfriends',
  'getfriendgroups',
  'getusertags',
  'login',
  'postevent',
  'essionexpire',
  'sessiongenerate',
  'syncitems',
  'getfriendspage',
  'getcomments',
  'addcomment',
]

const API = {}

methods.forEach(method => {
  API[method] = (params, callback) => {
    params.ver = params.ver || 1
    client.call('LJ.XMLRPC.' + method, [params], callback)
  }
})

export default API
