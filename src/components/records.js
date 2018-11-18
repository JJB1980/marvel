import { List, Record } from 'immutable'

export const ResultsState = new Record({
  results: List(),
  fetching: false,
  error: null,
  search: '',
  currentId: null
}, 'ResultsState')

export function loadResults (data) {
  const list = new List()
  return data.data.results.reduce((results, result) => {
    return results.push(result)
  }, list)
}
