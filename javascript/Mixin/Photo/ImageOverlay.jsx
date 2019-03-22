'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Overlay from '@essappstate/canopy-react-overlay'
import SortableList from './SortableList'
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

export default class ImageOverlay extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let photos = (
      <div key="1">
        <i className="fa fa-camera fa-5x"></i><br/>
        <h4>Click to browse<br/>- or -<br/>drag image(s) here</h4>
      </div>
    )

    let currentImages
    if (this.props.currentPhotos.length > 0) {
      currentImages = (
        <SortableList
          items={this.props.currentPhotos}
          axis={'xy'}
          loadToContainerEdges={true}
          onSortEnd={this.props.onSortEnd}
          deletePhoto={this.props.deletePhoto}
          rotate={this.props.rotate}
          useDragHandle={true}/>
      )
    }

    return (
      <Overlay close={this.props.close} title="Update images" show={this.props.show}>
        <div>
          <Dropzone
            classNames={{
              dropzone: 'dropzone'
            }}
            canRestart={false}
            getUploadParams={this.props.update}
            inputContent={photos}
            inputWithFilesContent="Click here to upload more images"
            accept="image/*"/>
        </div>
        <hr className="clearfix"/>
        <div>
          <h4>Current</h4>
          {currentImages}
        </div>
      </Overlay>
    )
  }
}

ImageOverlay.propTypes = {
  close: PropTypes.func,
  update: PropTypes.func,
  deletePhoto: PropTypes.func,
  rotate: PropTypes.func,
  currentPhotos: PropTypes.array,
  status: PropTypes.array,
  onSortEnd: PropTypes.func,
  show: PropTypes.bool
}
