'use strict'
import React from 'react'
import {SortableContainer} from 'react-sortable-hoc'
import Thumb from './Thumb.jsx'

const SortableList = SortableContainer(({items, deletePhoto, rotate}) => {
  const valign = {
    verticalAlign: 'top'
  }
  return (
    <ul style={valign}>
      {
        items.map((value, index) => {
          return <Thumb
            {...value}
            index={index}
            key={`item-${index}`}
            rotate={rotate.bind(this, value, index)}
            deletePhoto={deletePhoto.bind(this, value, index)}/>
        })
      }
    </ul>
  )
})

export default SortableList
