'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

/* global $ */

export default class ImageFrame extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    if (this.props.status === false) {
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
      if (this.props.status === true) {
        flag = <div style={imageStyle}>
          <i className="fa fa-check text-success fa-2x"></i>
          Success!</div>
      } else if (this.props.status === false) {
        flag = <div
          className="tool"
          style={imageStyle}
          data-toggle="tooltip"
          data-placement="bottom"
          title={this.props.status.error}>
          <i className="fa fa-times text-danger fa-2x"></i>
          Failure</div>
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
          <img src={this.props.image.thumbnail} style={imageStyle}/>
        </div>
        {flag}
      </div>
    )
  }
}

ImageFrame.propTypes = {
  image: PropTypes.object,
  status: PropTypes.bool
}
