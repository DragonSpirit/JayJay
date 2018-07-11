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
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
  key: 'root',
  storage,
}

const AppReducer = combineReducers({
  authors,
  feed: posts,
  common,
})

const persistedReducer = persistReducer(persistConfig, AppReducer)

const store = createStore(persistedReducer, applyMiddleware(thunk, logger))
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
