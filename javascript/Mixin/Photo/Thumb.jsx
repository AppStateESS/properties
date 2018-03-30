'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {SortableElement, SortableHandle,} from 'react-sortable-hoc'

export default class Thumb extends Component {
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
    const stamp = new Date().getTime()
    const url = `${this.props.thumbnail}?r=${stamp}`
    const thumb = (<img src={url}/>)
    return <SortableItem
      value={thumb}
      index={this.props.index}
      rotate={this.props.rotate}
      deletePhoto={this.deletePhoto}/>
  }
}

Thumb.propTypes = {
  thumbnail: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string,]),
  deletePhoto: PropTypes.func,
  rotate: PropTypes.func,
  index: PropTypes.number,
}

Thumb.defaultProps = {
  main: false
}

const DragHandle = SortableHandle(() => DragTag())

const DragTag = () => {
  const margin = {
    margin: '6px 0px'
  }
  return (
    <div style={margin} className="handle">
      <i className="fa fa-arrows"></i>&nbsp;Sort
    </div>
  )
}

const SortableItem = SortableElement(({value, deletePhoto,rotate}) => {
  const item = {
    display: 'inline-block',
    listStyleType: 'none',
    zIndex: 1000,
    width: '150px',
    height: '210px',
    border: '1px solid #c3c3c3',
    backgroundColor: '#e3e3e3',
    verticalAlign: 'top',
    margin: '0px 8px 8px 0',
    textAlign: 'center',
    overflow: 'hidden',
  }

  const marginTop = {
    marginTop: '6px'
  }
  return (
    <li style={item}>
      <DragHandle/> {value}
      <div style={marginTop}>
        <button onClick={rotate.bind(null, -1)}>
          <i className="fa fa-undo"></i>
        </button>
        <button onClick={rotate.bind(null, 1)}>
          <i className="fa fa-repeat"></i>
        </button>
      </div>
      <button
        style={marginTop}
        className="btn btn-sm btn-danger"
        onClick={deletePhoto}>
        <i className="far fa-trash-alt"></i>&nbsp;Delete</button>
    </li>
  )
})
