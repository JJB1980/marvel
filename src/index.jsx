
// @flow

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducers'
import App from './components/App'
import {initialize} from './components'
import './styles.scss'

const composeEnhancers : Function = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancers : Function = composeEnhancers(applyMiddleware(thunk))
const store : Object = createStore(reducer, enhancers)

store.dispatch(initialize())

const dom : any = document.getElementById('app')

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), dom)
