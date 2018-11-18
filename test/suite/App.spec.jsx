const {mount} = require('enzyme')

const App = require('../../src/components/App')

descibe('<App/>', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<App></App>)
  })

  it('should render', () => {
    expect(wrapper.exists()).to.be.true()
  })
})