import React, {Component} from 'react'
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

export class Header extends Component<Props> {
  constructor (props : Props) {
    super(props)
    const search : Function = (term : string) => {
      props.history.push('/')
      props.newSearch(term)
    }
    this.doSearch = debounce(search, 500)
  }

  render () {
    const {searchTerm, updateSearch, fetching} : Props = this.props

    const update : Function = (event : Object) => {
      updateSearch(event.target.value)
      this.doSearch(event.target.value)
    }

    return <div id={`${componentName}`}>
      <span id={`${componentName}-main`}>MARVEL</span>
      <span id={`${componentName}-sub`}> Explorer</span>
      <span id={`${componentName}-search`}>
        <MagnifyIcon/>
        <input value={searchTerm} onChange={update} placeholder='search...'/>
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
