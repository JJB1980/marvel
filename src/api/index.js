import 'universal-fetch'

import {ApiState} from './records'

const NS = 'API_'

const ENDPOINT = `${NS}ENDPOINT`
const STATUS = `${NS}STATUS`

const initialState = new ApiState()

const STATUS_FETCHING = 'fetching'
const STATUS_FETCHED = 'fetched'

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

export function fetchStatus (status) {
  return {type: STATUS, payload: status}
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

const mocks = {
  'default': {timeout: 0, result: {}, enabled: true}
  // '/some/endpoint': require('./somefile')
}

export function fetchApi ({method = 'GET', api = 'default', data = {}, url = null}) {
  return (dispatch, getState, {window: {setTimeout}}) => {
    return new Promise(async (resolve, reject) => {
      dispatch(fetchStatus(STATUS_FETCHING))

      let timeout = 0
      let result = {}
      let enabled = true

      if (!url) {
        const mock = mocks[api]

        result = mock.result || {}
        timeout = mock.timeout || 0
        enabled = mock.enabled
      }

      if (enabled) {
        let apiUrl = url || `${getEndpoint(getState())}${api}`
        const response = await fetch(apiUrl, {method, body: method !== 'GET' ? data : null})

        result = await response.json()
      }

      setTimeout(() => {
        resolve(result)
        dispatch(fetchStatus(STATUS_FETCHED))
      }, timeout)
    })
  }
}
