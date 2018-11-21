import React from 'react'

import {mount, shallow} from 'enzyme'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import { shape } from 'prop-types'

import App from '../../src/components/App'
import reducers from '../../src/reducers'

const enhancers = compose(applyMiddleware(thunk))
const store = createStore(reducers, enhancers)

describe('<App/>', () => {
  let wrapper

  const init = () => {
    // wrapper = shallow(<App />)
    const props = {
      location: {
        pathname: ''
      },
      match: {
        search: ''
      }
    }
    const component = <Provider store={store}>
      <Router>
        <App {...props} />
      </Router>
    </Provider>
    return mount(component)
  }

  it('should render', () => {
    const wrapper = init()
    expect(wrapper.exists()).to.be.true()
  })

  it('should render a Header component', () => {
    const wrapper = init()
    expect(wrapper.find('Header').exists()).to.be.true()
  })
})

