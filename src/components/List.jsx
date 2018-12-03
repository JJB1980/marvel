// @flow

import React from 'react'
import {List} from 'immutable'

import {projectName} from '../config'

import './List.scss'

const componentName : string = `${projectName}-list`

export default (props : Object) => {
  const {items, title} : {items : List, id: string, title : string} = props

  if (!items || !items.size) return null

  return <div className={componentName}>
    <span>{title}</span>
    <ul>
      {items.map(({name}, index) => {
        return <li key={index}>{name}</li>
      })}
    </ul>
  </div>
}
