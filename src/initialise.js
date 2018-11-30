import {initialize as components} from './components'
import {initialize as api} from './api'

export default function initialize () {
  return (dispatch) => {
    dispatch(components())
    dispatch(api())
  }
}
