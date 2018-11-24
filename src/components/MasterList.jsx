// @flow

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {List} from 'immutable'

import {getResults, currentId} from './'
import {projectName} from '../config'

import './MasterList.scss'

const componentName = `${projectName}-master-list`

type Props = {
  results : List,
  currentId : Function,
  history : Object
}

export class MasterList extends Component<Props> {
  render () {
    const {results, currentId, history} = this.props

    const route = (id : string) => {
      currentId(id)
      history.push(`/character/${id}`)
    }

    let resultsDom : ?Object = null
    if (results.size) {
      resultsDom = results.map(({name, id}, index) => {
        return <div key={index} onClick={route.bind(null, id)}>
          {name}
        </div>
      })
    }

    return <div id={`${componentName}`}>
      {resultsDom}
    </div>
  }
}

function mapStateToProps (state) {
  return {
    results: getResults(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({currentId}, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MasterList))
