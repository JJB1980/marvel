import {List, Record} from 'immutable'

export const ResultsState = new Record({
  results: List(),
  fetching: false,
  error: null,
  search: '',
  theme: '',
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

  if (!data.data || !data.data.results) return list

  return data.data.results.reduce((results, result) => {
    return results.push(new Character({
      ...result,

      comics: new List(result.comics.items),
      series: new List(result.series.items)
    }))
  }, list)
}
