import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import Header from './Header'
import MasterList from './MasterList'
import Routes from '../routes'

export class App extends React.Component {
  render () {
    return <div id='App'>
      <Header/>
      <MasterList/>
      <Routes/>
    </div>
  }
}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
