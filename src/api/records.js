import {Record} from 'immutable'

export const ApiState = new Record({
  endpoint: '',
  status: ''
}, 'ApiState')
