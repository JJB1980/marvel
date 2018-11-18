import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import {getResults, getCurrentId, getFetching} from './'

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
      {comics.length &&
        <div id='master-comics'><span>Comics</span><ul>
          {comics.items.map(({name}, index) => {
            return <li key={index}>{name}</li>
          })}
        </ul></div>
      }
      {series.length &&
        <div id='master-series'><span>Series</span><ul>
          {series.items.map(({name}, index) => {
            return <li key={index}>{name}</li>
          })}
        </ul></div>
      }
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
