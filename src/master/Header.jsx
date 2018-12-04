import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {debounce} from 'lodash'

import MagnifyIcon from 'mdi-react/MagnifyIcon'

import {search, getSearch, newSearch} from './'
import {projectName} from '../config'
import {isFetching} from '../api'

import './Header.scss'

const componentName = `${projectName}-heading`

type Props = {
  searchTerm : string,
  updateSearch : Function,
  newSearch : Function,
  fetching : boolean
}

export class Header extends React.Component<Props> {
  constructor (props : Props) {
    super(props)

    const {newSearch, history, updateSearch} : Props = props

    const search : Function = (term : string) => {
      history.push('/')
      newSearch(term)
    }

    const doSearch : Function = debounce(search, 700)

    this.update = ({target: {value}} : {target: {value : string}}) => {
      updateSearch(value)
      doSearch(value)
    }
  }

  render () {
    const {searchTerm, fetching} : Props = this.props

    return <div id={`${componentName}`}>
      <span id={`${componentName}__main`}>MARVEL</span>
      <span id={`${componentName}__sub`}> Explorer</span>
      <span id={`${componentName}__search`}>
        <MagnifyIcon/>
        <input value={searchTerm} onChange={this.update} placeholder='search...'/>
      </span>
      {fetching && <div id='spinner'>
        <div className='bounce1'></div>
        <div className='bounce2'></div>
        <div className='bounce3'></div>
      </div>}
    </div>
  }
}

function mapStateToProps (state) {
  return {
    searchTerm: getSearch(state),
    fetching: isFetching(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    updateSearch: search,
    newSearch: newSearch
  }, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header))
