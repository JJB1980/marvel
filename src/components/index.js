import {ResultsState, loadResults} from './records'

const NS = 'APP_'

const RESULTS = `${NS}RESULTS`
const UPDATE_SEARCH = `${NS}UPDATE_SEARCH`
const FETCHING = `${NS}FETCHING`
const CURRENT_ID = `${NS}CURRENT_ID`

const initialState = new ResultsState()

export default function reducer (state = initialState, {type, payload}) {
  switch (type) {
  case RESULTS:
    return state.set('results', loadResults(payload))

  case UPDATE_SEARCH:
    return state.set('search', payload)

  case FETCHING:
    return state.set('fetching', payload)

  case CURRENT_ID:
    return state.set('currentId', payload)

  default:
    return state
  }
}

// actions ---------

export function results (data) {
  return {type: RESULTS, payload: data}
}

export function search (term) {
  return {type: UPDATE_SEARCH, payload: term}
}

export function fetching (how) {
  return {type: FETCHING, payload: how}
}

export function currentId (id) {
  return {type: CURRENT_ID, payload: id}
}

// selectors --------

export function getResults (state) {
  return state.components.results
}

export function getSearch (state) {
  return state.components.search
}

export function getFetching (state) {
  return state.components.fetching
}

export function getCurrentId (state) {
  return state.components.currentId
}

// thunks -----------

export function initialize () {
  return (dispatch) => {
    dispatch(newSearch())
  }
}

export function newSearch (term = '') {
  return async (dispatch, getState) => {
    let url = 'http://gateway.marvel.com/v1/public/characters?limit=100&apikey=ddf365a3803a6e76f421e7f4d2794fef'
    if (term) { url += `&nameStartsWith=${term}` }

    dispatch(fetching(true))
    dispatch(currentId(null))

    const response = await fetch(url)
    const data = await response.json()

    dispatch(fetching(false))
    dispatch(results(data))
  }
}
