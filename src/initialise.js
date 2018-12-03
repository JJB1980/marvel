import {initialize as master} from './master'
import {initialize as api} from './api'
import {initialize as themes} from './themes'

export default function initialize () {
  return (dispatch, _, {theme}) => {
    dispatch(master())
    dispatch(api())

    themes(theme)
  }
}
