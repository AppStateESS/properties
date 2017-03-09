'use strict'
import React from 'react'
import Overlay from '../Html/Overlay.jsx'
import Dropzone from 'react-dropzone'
import Thumb from './Thumb.jsx'
import ImageFrame from './ImageFrame.jsx'
import {SortableContainer} from 'react-sortable-hoc'

export default class ImageOverlay extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let photos = (
      <div style={{
        paddingTop: '2%'
      }}>
        <i className="fa fa-camera fa-5x"></i><br/>
        <h4>Click to browse<br/>- or -<br/>drag image(s) here</h4>
      </div>
    )
    if (this.props.newPhotos.length > 0) {
      photos = this.props.newPhotos.map(function (value, key) {
        let status
        if (this.props.status[key] !== undefined) {
          status = this.props.status[key]
        }
        return <ImageFrame key={key} image={value} status={status}/>
      }.bind(this))
    }

    let currentImages
    if (this.props.currentPhotos.length > 0) {
      currentImages = <SortableList helperClass="sortableHelper"
        items={this.props.currentPhotos} axis={'xy'} loadToContainerEdges={true}
        onSortEnd={this.props.onSortEnd} deletePhoto={this.props.deletePhoto} useDragHandle={true}/>
    }

    return (
      <Overlay close={this.props.close} title="Update images">
        <div>
          <Dropzone
            ref="dropzone"
            onDrop={this.props.update}
            className="dropzone text-center pointer">
            {photos}
          </Dropzone>
          <div>
            <button className="btn btn-default" onClick={this.props.clear}>Clear</button>
          </div>
          <hr/>
          <div style={{
            clear: 'both'
          }}></div>
          <div>
            <h4>Current</h4>
            {currentImages}
          </div>
        </div>
      </Overlay>
    )
  }
}

ImageOverlay.propTypes = {
  close: React.PropTypes.func,
  update: React.PropTypes.func,
  deletePhoto: React.PropTypes.func,
  clear: React.PropTypes.func,
  newPhotos: React.PropTypes.array,
  currentPhotos: React.PropTypes.array,
  status: React.PropTypes.array,
  onSortEnd: React.PropTypes.func,
}

const SortableList = SortableContainer(({items, deletePhoto}) => {
  return (
    <ul style={{verticalAlign : 'top'}}>
      {items.map((value, index) => <Thumb {...value} index={index} key={`item-${index}`} deletePhoto={deletePhoto.bind(this, value, index)}/>)}
    </ul>
  )
})
