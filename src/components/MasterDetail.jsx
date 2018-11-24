// @flow

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {List as ImmutableList} from 'immutable'

import {getResults, getCurrentId, getFetching} from './'
import List from './List'
import {Character} from './records'

type Props = {results : ImmutableList, match: {params: {id : string}}, fetching : boolean}

export class MasterDetail extends Component<Props> {
  render () {
    const {results, match: {params: {id: currentId}}, fetching} : Props = this.props

    if (currentId === undefined || fetching || results.size === 0) return null

    const character : Character = results.find(({id}) => id.toString() === currentId)

    if (!character) return null

    const {
      name,
      thumbnail: {path, extension},
      description,
      comics,
      series
    } : Character = character

    return <div id='master-detail'>
      <div id='master-heading'>{name}</div>
      <div id='master-icon'><img src={`${path}.${extension}`}/></div>
      {description && <div id='master-description'>{description}</div>}
      <List id='master-comics' title='Comics' items={comics}/>
      <List id='master-series' title='Series' items={series}/>
    </div>
  }
}

function mapStateToProps (state) {
  return {
    results: getResults(state),
    currentId: getCurrentId(state),
    fetching: getFetching(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MasterDetail))
