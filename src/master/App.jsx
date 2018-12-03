import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import Header from './Header'
import MasterList from './MasterList'
import Routes from '../routes'

import {getTheme} from './index'

const App = (props) => {
  const {theme} = props

  return <div id={`${theme}-theme`}>
    <Header/>
    <MasterList/>
    <Routes/>
  </div>
}

function mapStateToProps (state) {
  return {
    theme: getTheme(state)
  }
}

export default withRouter(connect(
  mapStateToProps,
  null
)(App))
