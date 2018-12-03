import {combineReducers} from 'redux'

import master from './master'
import api from './api'

export default combineReducers({
  master,
  api
})
