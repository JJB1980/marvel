import React from 'react'

import {mounted} from '../utils'

import App from '../../src/components/App'

describe('<App/>', () => {
  let wrapper = mounted(App)

  it('should render', () => {
    expect(wrapper.exists()).to.be.true()
  })

  it('should render a Header component', () => {
    expect(wrapper.find('Header').exists()).to.be.true()
  })

  it('should render a MasterList component', () => {
    expect(wrapper.find('MasterList').exists()).to.be.true()
  })

  it('should render a Routes component', () => {
    expect(wrapper.find('Routes').exists()).to.be.true()
  })
})

