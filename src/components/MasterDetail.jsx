// @flow

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {List as ImmutableList} from 'immutable'

import {getResults, getCurrentId, getFetching} from './'
import List from './List'
import {Character} from './records'

import './MasterDetail.scss'

const componentName = 'master'

type Props = {
  results : ImmutableList,
  match: {
    params: {
      id : string
    }
  },
  fetching : boolean
}

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

    return <div id={`${componentName}-detail`}>
      <div id={`${componentName}-heading`}>{name}</div>
      <div id={`${componentName}-icon`}><img src={`${path}.${extension}`}/></div>
      {description && <div id={`${componentName}-description`}>{description}</div>}
      <List id={`${componentName}-comics`} title='Comics' items={comics}/>
      <List id={`${componentName}-series`} title='Series' items={series}/>
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
