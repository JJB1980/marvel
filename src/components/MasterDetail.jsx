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

    if (currentId === undefined || fetching || results.size === 0) return null

    const character = results.find(({id}) => id.toString() === currentId)

    if (!character) return null

    const {
      name,
      thumbnail: {path, extension},
      description,
      comics,
      series
    } = character

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
