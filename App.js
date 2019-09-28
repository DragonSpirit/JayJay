import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { RootNavigation } from './src/navigator/AppNavigator'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { PersistGate } from 'redux-persist/integration/react'
import FSStorage from 'redux-persist-fs-storage'
import authors from './src/reducers/authors'
import posts from './src/reducers/posts'
import common from './src/reducers/common'

const persistConfig = {
  key: 'root',
  storage: FSStorage(),
  keyPrefix: '',
  blacklist: ['common'],
}

const AppReducer = combineReducers({
  authors,
  feed: posts,
  common,
})

const middlewares = [thunk]

if (__DEV__) {
  middlewares.push(logger)
}

const persistedReducer = persistReducer(persistConfig, AppReducer)

const store = createStore(persistedReducer, applyMiddleware(...middlewares))
export const persistor = persistStore(store)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigation />
        </PersistGate>
      </Provider>
    )
  }
}
