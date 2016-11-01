'use strict'
import React from 'react'
import Overlay from '../Mixin/Overlay.jsx'
import Dropzone from 'react-dropzone'

/* global $ */

export default class ImageOverlay extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let photos
    if (this.props.photos.length > 0) {
      photos = this.props.photos.map(function (value, key) {
        let status
        if (this.props.status[key] !== undefined) {
          status = this.props.status[key]
        }
        return <ImageFrame key={key} image={value} status={status}/>
      }.bind(this))
    }

    const photoListStyle = {
      marginBottom: '1em',
      overflow: 'auto'
    }

    return (
      <Overlay close={this.props.close} title="Update images">
        <div>
          <Dropzone
            ref="dropzone"
            onDrop={this.props.update}
            className="dropzone text-center pointer">
            <div style={{
              paddingTop: '2%'
            }}>
              <i className="fa fa-camera fa-5x"></i><br/>
              <h4>Click to browse<br/>- or -<br/>drag image(s) here</h4>
            </div>
          </Dropzone>
          <hr/>
          <div style={photoListStyle}>
            {photos}
          </div>
        </div>
      </Overlay>
    )
  }
}

ImageOverlay.propTypes = {
  close: React.PropTypes.func,
  update: React.PropTypes.func,
  photos: React.PropTypes.array,
  status: React.PropTypes.array
}

class ImageFrame extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    if (this.props.status.success === false) {
      $('.tool').tooltip()
    }
  }

  render() {
    const divStyle = {
      width: '152px',
      textAlign: 'center',
      height: '152px',
      backgroundColor: '#B9B9B9',
      marginBottom: '4px',
      border: '1px solid black'
    }
    const imageStyle = {
      maxHeight: '150px',
      maxWidth: '150px'
    }

    let flag = (
      <div>
        <i className="fa fa-spinner fa-spin fa-2x fa-fw"></i>
        <span>Uploading...</span>
      </div>
    )
    if (this.props.status) {
      if (this.props.status.success === true) {
        flag = <div style={imageStyle}><i className="fa fa-check text-success fa-2x"></i> Success!</div>
      } else {
        flag = <div className="tool" style={imageStyle} data-toggle="tooltip" data-placement="bottom" title={this.props.status.error}><i className="fa fa-times text-danger fa-2x"></i> Failure</div>
      }
    }

    const outerStyle = {
      float: 'left',
      marginRight: '6px',
      textAlign: 'center'
    }
    return (
      <div style={outerStyle}>
        <div style={divStyle}>
          <img src={this.props.image.preview} style={imageStyle}/>
        </div>
        {flag}
      </div>
    )
  }
}

ImageFrame.propTypes = {
  image: React.PropTypes.object,
  status: React.PropTypes.object
}

ImageFrame.defaultProps = {
  status : {}
}
