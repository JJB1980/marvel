import React from 'react'

import Header from './Header'
import MasterList from './MasterList'
import Routes from '../routes'

export default () => {
  return <div id='App'>
    <Header/>
    <MasterList/>
    <Routes/>
  </div>
}
