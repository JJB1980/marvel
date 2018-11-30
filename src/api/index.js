import 'universal-fetch'

import path from 'path'
import {ApiState} from './records'

const NS = 'API_'

const ENDPOINT = `${NS}ENDPOINT`
const STATUS = `${NS}STATUS`

const initialState = new ApiState()

const STATUS_FETCHING = 'fetching'

export default function reducer (state = initialState, {type, payload}) {
  switch (type) {
  case ENDPOINT:
    return state.set('endpoint', payload)

  case STATUS:
    return state.set('status', payload)

  default:
    return state
  }
}

// actions ---------

export function endpoint (data) {
  return {type: ENDPOINT, payload: data}
}

export function fetchStatus (data) {
  return {type: STATUS, payload: data}
}

// selectors --------

export function getEndpoint (state) {
  return state.api.endpoint
}

export function isFetching (state) {
  return state.api.status === STATUS_FETCHING
}

// thunks -----------

export function initialize () {
  return (dispatch, _, {endpoint: apiEndpoint}) => {
    dispatch(endpoint(apiEndpoint))
  }
}

export function fetchApi ({method = 'GET', api, data = {}, url = null}) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let apiUrl = url || path.resolve(getEndpoint(getState()), api)

      dispatch(fetchStatus('fetching'))

      const response = await fetch(apiUrl, {method, body: method !== 'GET' ? data : null})
      const result = await response.json()

      dispatch(fetchStatus('fetched'))

      resolve(result)
    })
  }
}
