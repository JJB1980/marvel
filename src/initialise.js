import {initialize as components} from './components'
import {initialize as api} from './api'
import {initialize as themes} from './themes'

export default function initialize () {
  return (dispatch, _, {theme}) => {
    dispatch(components())
    dispatch(api())

    themes(theme)
  }
}
