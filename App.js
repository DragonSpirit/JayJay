import React from 'react'
import { Provider } from 'react-redux'
import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux'
import { RootNavigation } from './src/navigator/AppNavigator'
import authors from './src/reducers/authors'
import posts from './src/reducers/posts'
import common from './src/reducers/common'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import Reactotron from 'reactotron-react-native'

Reactotron
  .configure()
  .useReactNative()
  .connect()

const AppReducer = combineReducers({
  authors,
  feed: posts,
  common,
})
const store = createStore(AppReducer, applyMiddleware(thunk, logger))

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    )
  }
}
