import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {debounce} from 'lodash'

import MagnifyIcon from 'mdi-react/MagnifyIcon'

import {search, getSearch, newSearch, getFetching} from './'

export class Header extends React.Component {
  constructor (props) {
    super(props)
    const search = (term) => {
      props.history.push('/')
      props.newSearch(term)
    }
    this.doSearch = debounce(search, 500)
  }

  render () {
    const {searchTerm, updateSearch, fetching} = this.props

    const update = (event) => {
      updateSearch(event.target.value)
      this.doSearch(event.target.value)
    }

    return <div id='header'>
      <span id='heading-main'>MARVEL</span>
      <span id='heading-sub'> Explorer</span>
      <span id='heading-search'>
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
    fetching: getFetching(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    updateSearch: search,
    newSearch: newSearch,
  }, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header))
