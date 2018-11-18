import React from 'react'

import Header from './Header'
import MasterList from './MasterList'
import Routes from '../routes'

export default class App extends React.Component {
  render () {
    return <div id='App'>
      <Header/>
      <MasterList/>
      <Routes/>
    </div>
  }
}
