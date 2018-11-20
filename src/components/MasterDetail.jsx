import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import {getResults, getCurrentId, getFetching} from './'
import List from './List'

export class MasterDetail extends React.Component {
  render () {
    const {results, match, fetching} = this.props
    const currentId = match.params.id

    if (currentId === undefined || fetching || results.size === 0)
      return null

    const {name, thumbnail, description, comics, series} = results.get(currentId)

    return <div id='master-detail'>
      <div id='master-heading'>{name}</div>
      <div id='master-icon'><img src={`${thumbnail.path}.${thumbnail.extension}`}/></div>
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
