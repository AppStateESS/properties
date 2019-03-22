'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ImageOverlay from '../Mixin/Photo/ImageOverlay.jsx'
import bindMethods from '../Mixin/Helper/Bind.js'

/* global $, propertyId, currentPhotos */

export default class PropertyImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      currentPhotos: [],
      status: []
    }
    const methods = [
      'overlayOn',
      'overlayOff',
      'addPhotos',
      'deletePhoto',
      'onSortEnd',
      'rotate',
      'load'
    ]
    bindMethods(methods, this)
  }

  componentDidMount() {
    $('#edit-photo-button').click(() => this.overlayOn())
    if (currentPhotos.length > 0) {
      this.setState({currentPhotos: currentPhotos})
    }
  }

  load() {
    $.ajax({
      url: './properties/Photo',
      data: {
        propertyId
      },
      dataType: 'json',
      type: 'get',
      success: (data) => {
        this.setState({currentPhotos: data})
      },
      error: () => {}
    })
  }

  addPhotos(photos) {
    let status = this.state.status
    $.each(photos, (key, value) => {
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
        success: (data) => {
          if (data.success === true) {
            this.load()
          } else if (data.success === false) {
            alert(data.error)
            return
          }
          status[key] = data.success
          this.setState({status: status})
        },
        error: () => {
          alert(
            'Sorry but your file is unacceptable. It may be of the wrong type or too large.' +
            ' Please try again.'
          )
        }
      })
    })
  }

  onSortEnd(movement) {
    const {oldIndex, newIndex} = movement
    const newPosition = this.state.currentPhotos[newIndex].porder
    const movingPhotoId = this.state.currentPhotos[oldIndex].id
    $.ajax({
      url: './properties/Photo/' + movingPhotoId,
      data: {
        propertyId: propertyId,
        varname: 'move',
        newPosition: newPosition
      },
      dataType: 'json',
      type: 'patch',
      success: (data) => {
        if (data.success) {
          this.load()
        }
      }
    })
  }

  overlayOn() {
    this.setState({show: true})
  }

  overlayOff() {
    this.setState({show: false})
    window.loadProp()
  }

  deletePhoto(photo) {
    $.ajax({
      url: './properties/Photo/' + photo.id,
      data: {
        propertyId: propertyId
      },
      dataType: 'json',
      method: 'DELETE',
      success: () => {
        this.load()
      },
      error: () =>{}
    })
  }

  rotate(photo, key, direction) {
    $.ajax({
      url: './properties/Photo/' + photo.id + '/rotate',
      data: {
        direction: direction
      },
      dataType: 'json',
      type: 'put',
      success: () => {
        this.forceUpdate()
      },
      error: () => {}
    })
  }

  render() {
    return (
      <ImageOverlay
        show={this.state.show}
        rotate={this.rotate}
        deletePhoto={this.deletePhoto}
        close={this.overlayOff}
        update={this.addPhotos}
        currentPhotos={this.state.currentPhotos}
        status={this.state.status}
        onSortEnd={this.onSortEnd}/>
    )
  }
}

PropertyImage.propTypes = {
  current: PropTypes.array
}
