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
      loading: false,
      errors: false
    }
    const methods = [
      'overlayOn',
      'overlayOff',
      'addPhoto',
      'deletePhoto',
      'onSortEnd',
      'rotate',
      'pushPhoto',
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
    this.setState({loading: true, errors: false})
    $.ajax({
      url: './properties/Photo',
      data: {
        propertyId
      },
      dataType: 'json',
      type: 'get',
      success: (data) => {
        this.setState({currentPhotos: data, loading: false})
      },
      error: () => {}
    })
  }

  pushPhoto(photo) {
    const {currentPhotos} = this.state
    currentPhotos.push(photo)
    this.setState({currentPhotos})
  }

  addPhoto(photos) {
    const promises = []
    photos.forEach((photo) => {
      const formData = new FormData()
      formData.append('propertyId', propertyId)
      formData.append('photo', photo.file)
      const promise = $.ajax({
        url: './properties/Photo',
        type: 'POST',
        data: formData,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: (data) => {
          if (data.success === true) {
            this.pushPhoto(data.photo)
          } else if (data.success === false) {
            throw data.error
          }
        },
      })

      promises.push(promise)
    })
    Promise.all(promises).catch(() => {
      this.setState({errors : true})
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
      error: () => {}
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
        update={this.addPhoto}
        errors={this.state.errors}
        currentPhotos={this.state.currentPhotos}
        loading={this.state.loading}
        onSortEnd={this.onSortEnd}/>
    )
  }
}

PropertyImage.propTypes = {
  current: PropTypes.array
}
