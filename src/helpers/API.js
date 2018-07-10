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

// API.getevents({
//   journal: 'evo-lutio',
//   auth_method: 'noauth',
//   selecttype: 'lastn',
//   howmany: 20,
// }, function (err, value) {
//   if (err) console.warn(err)
//   if (value && value.events) {
//     console.warn(value.events[0].subject)
//   }
// })
