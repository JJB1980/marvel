// @flow

import React from 'react'
import {List} from 'immutable'

import {projectName} from '../config'

import './List.scss'

const componentName : string = `${projectName}-list`

type Props = {
  items : List,
  title : string
}

export default ({items, title} : Props) => {
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
