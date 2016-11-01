'use strict'
import React from 'react'
import ImageOverlay from './ImageOverlay.jsx'
import bindMethods from '../Mixin/Bind.js'

/* global $, propertyId */

export default class PropertyImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      photos: [],
      status: []
    }
    const methods = ['overlayOn', 'overlayOff', 'addPhotos']
    bindMethods(methods, this)
  }

  addPhotos(photos) {
    let status = this.state.status

    this.setState({photos: photos})
    $.each(photos, function (key, value) {
      let formData = new FormData()
      formData.append('propertyId', propertyId)
      formData.append('photo', value)
      $.ajax({
        url: './properties/Photo',
        type: 'POST',
        data: formData,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (data) {
          status[key] = data
          this.setState({status: status})
        }.bind(this)
      })
    }.bind(this))
  }

  overlayOn() {
    this.setState({show: true})
  }

  overlayOff() {
    this.setState({show: false, photos: []})
  }

  render() {
    let overlay
    if (this.state.show) {
      overlay = (<ImageOverlay
        close={this.overlayOff}
        update={this.addPhotos}
        photos={this.state.photos}
        status={this.state.status}/>)
    }
    return (
      <div>
        {overlay}
        <span>
          <button type="button" className="btn btn-default" onClick={this.overlayOn}>Update images</button>
        </span>
      </div>
    )
  }
}

PropertyImage.propTypes = {}
