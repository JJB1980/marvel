import React from 'react'
import { Route, Switch } from 'react-router-dom'

import MasterDetail from './components/MasterDetail'

export default function Routes (props) {
  return (
    <Switch>
      <Route exact path='/' component={MasterDetail} />
      <Route exact path='/character/:id' component={MasterDetail} />
      <Route nomatch component={() => <Box align='center'>404</Box>} />
    </Switch>
  )
}
