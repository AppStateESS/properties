'use strict'
import React from 'react'
import {SortableElement, SortableHandle} from 'react-sortable-hoc'

export default class Thumb extends React.Component {
  constructor(props) {
    super(props)
    this.deletePhoto = this.deletePhoto.bind(this)
  }

  deletePhoto(e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.deletePhoto()
  }

  render() {
    const thumb = (<img src={this.props.thumbnail}/>)
    return <SortableItem
      value={thumb}
      index={this.props.index}
      deletePhoto={this.deletePhoto}/>
  }
}

Thumb.propTypes = {
  thumbnail: React.PropTypes.string,
  id: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  deletePhoto: React.PropTypes.func,
  index: React.PropTypes.number
}

Thumb.defaultProps = {
  main: false
}

const DragHandle = SortableHandle(() => DragTag())

const DragTag = () => {
  const margin = {margin: '6px 0px'}
  return (
    <div style={margin} className="handle">
        <i className="fa fa-arrows"></i>&nbsp;Sort
    </div>
  )
}

const SortableItem = SortableElement(({value, deletePhoto}) => {
  const item = {
    display: 'inline-block',
    listStyleType: 'none',
    zIndex: 1000,
    width: '150px',
    height: '177px',
    border: '1px solid #c3c3c3',
    backgroundColor: '#e3e3e3',
    verticalAlign: 'top',
    margin: '0px 8px 8px 0',
    textAlign: 'center'
  }

  const deleteButton = {
    marginTop: '6px'
  }
  return (
    <li style={item}>
      <DragHandle/> {value}
      <button
        style={deleteButton}
        className="btn btn-sm btn-danger"
        onClick={deletePhoto}>
        <i className="fa fa-trash-o"></i>&nbsp;Delete</button>
    </li>
  )
})
