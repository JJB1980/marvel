import {combineReducers} from 'redux'

import components from './components'
import api from './api'

export default combineReducers({
  components,
  api
})
