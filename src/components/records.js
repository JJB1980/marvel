import {List, Record} from 'immutable'

export const ResultsState = new Record({
  results: List(),
  fetching: false,
  error: null,
  search: '',
  currentId: ''
}, 'ResultsState')

export const Character = new Record({
  id: '',
  name: '',
  description: '',
  thumbnail: {},
  comics: List(),
  series: List()
}, 'Character')

export function loadResults (data) {
  const list = new List()

  return data.data.results.reduce((results, result) => {
    return results.push(new Character({
      ...result,

      comics: new List(result.comics.items),
      series: new List(result.series.items)
    }))
  }, list)
}
