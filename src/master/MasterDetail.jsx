// @flow

import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {List} from 'immutable'

import {getResults, getCurrentId, getFetching} from './'
import ComicsSeriesList from '../components/List'
import {Character} from './records'
import {projectName} from '../config'

import './MasterDetail.scss'

const componentName : string = `${projectName}-master`

type Props = {
  results : List,
  match: {
    params: {
      id : string
    }
  },
  fetching : boolean
}

export function MasterDetail (props : Props) {
  const {results, match: {params: {id: currentId}}, fetching} : Props = props

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

  return <div id={`${componentName}__detail`}>
    <div id={`${componentName}__heading`}>{name}</div>
    <div id={`${componentName}__icon`}><img src={`${path}.${extension}`}/></div>
    {description && <div id={`${componentName}__description`}>{description}</div>}
    <ComicsSeriesList title='Comics' items={comics}/>
    <ComicsSeriesList title='Series' items={series}/>
  </div>
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
