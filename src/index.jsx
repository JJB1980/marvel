import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducers'
import App from './components/App'
import {initialize} from './components'
import './styles.scss'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancers = composeEnhancers(applyMiddleware(thunk))
const store = createStore(reducer, enhancers)

store.dispatch(initialize())

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
), document.getElementById('app'))
