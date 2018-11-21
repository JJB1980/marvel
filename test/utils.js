import React from 'react'
import {mount, shallow} from 'enzyme'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import reducers from '../src/reducers'

const enhancers = compose(applyMiddleware(thunk))
const store = createStore(reducers, enhancers)

export const mounted = (Component, props = {}) => {
  const c = <Provider store={store}>
    <Router>
      <Component {...props} />
    </Router>
  </Provider>
  return mount(c)
}
