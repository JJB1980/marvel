import React from 'react'

import {mount, shallow} from 'enzyme'

import App from '../../src/components/App'

describe('<App/>', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<App></App>)
  })

  it('should render', () => {
    expect(wrapper.exists()).to.be.true()
  })
})