import xmlrpc from 'react-native-xmlrpc'
const client = new xmlrpc('https://www.livejournal.com/interface/xmlrpc')

var methods = [
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

methods.forEach(function (method) {
  API[method] = function (params, callback) {

    params.ver = params.ver || 1

    client.call('LJ.XMLRPC.' + method, [params], (err, value) => {
      callback(err, value)
    })
  }
})

export default API
