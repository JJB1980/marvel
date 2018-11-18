import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import {getResults, currentId} from './'

export class MasterList extends React.Component {
  render () {
    const {results, currentId, history} = this.props

    const route = id => {
      history.push(`/character/${id}`)
    }

    let resultsDom = null
    if (results.size) {
      resultsDom = results.toJS().map(({name}, index) => {
        return <div key={index} onClick={route.bind(null, index)}>
          {name}
        </div>
      })
    }

    return <div id='master-list'>
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
