import React from 'react'

import {List} from 'immutable'
import {shallow} from 'enzyme'

import ListComponent from '../../../src/components/List'

describe('<List/>', () => {
  let wrapper

  const props = {
    items: new List([{name: 'a'}, {name: 'b'}]),
    title: 'test',
    id: 'id'
  }

  beforeEach(() => {
    wrapper = shallow(<ListComponent {...props}/>)
  })

  it('should render List component', () => {
    expect(wrapper.exists()).to.be.true()
  })

  it('should render ul', () => {
    expect(wrapper.find('ul')).to.have.lengthOf(1)
    expect(wrapper.find('li')).to.have.lengthOf(props.items.size)
  })

  it('should render title', () => {
    expect(wrapper.find('span').html()).to.contain(props.title)
  })

  it('should render div with id', () => {
    expect(wrapper.find('div').props().id).to.equal(props.id)
  })
})
