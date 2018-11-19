import React from 'react'

export default (props) => {
  const {items, id, title} = props

  if (!items.length)
    return null

  return <div id={id}>
    <span>{title}</span>
    <ul>
      {items.map(({name}, index) => {
        return <li key={index}>{name}</li>
      })}
    </ul>
  </div>
}