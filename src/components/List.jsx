import React from 'react'

import {List} from 'immutable'

export default (props) => {
  const {items, id, title} : {items : typeof List, id: string, title : string} = props

  if (!items || !items.size) return null

  return <div id={id}>
    <span>{title}</span>
    <ul>
      {items.map(({name}, index) => {
        return <li key={index}>{name}</li>
      })}
    </ul>
  </div>
}
