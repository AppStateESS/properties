'use strict'
import React from 'react'
import ImageOverlay from '../Mixin/Photo/ImageOverlay.jsx'
import bindMethods from '../Mixin/Helper/Bind.js'
import {arrayMove} from 'react-sortable-hoc'

/* global $, propertyId, loadPhotos, editPhotos, currentPhotos */

export default class PropertyImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      newPhotos: [],
      currentPhotos: [],
      status: []
    }
    const methods = [
      'overlayOn',
      'overlayOff',
      'addPhotos',
      'clearNewPhotos',
      'deletePhoto',
      'onSortEnd'
    ]
    bindMethods(methods, this)
  }

  componentDidMount() {
    editPhotos.callback = this.overlayOn
    if (currentPhotos.length > 0) {
      this.setState({currentPhotos: currentPhotos})
    }
  }

  clearNewPhotos() {
    this.setState({newPhotos: []})
  }

  addPhotos(photos) {
    let status = this.state.status
    let newPhotos = []
    let currentPhotos = []
    this.clearNewPhotos()
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
          currentPhotos = this.state.currentPhotos
          if (data.success === true) {
            currentPhotos.push(data.photo)
          }
          newPhotos.push(data.photo)
          status[key] = data.success
          this.setState({status: status, currentPhotos: currentPhotos, newPhotos: newPhotos})
        }.bind(this),
        failure: function (data) {
          newPhotos.push(data.photo)
          status[key] = false
          this.setState({status: status, newPhotos: newPhotos})
        }.bind(this)
      })
    }.bind(this))
  }

  onSortEnd(movement)
  {
    const {oldIndex, newIndex} = movement
    const newPosition = this.state.currentPhotos[newIndex].porder
    const movingPhotoId = this.state.currentPhotos[oldIndex].id
    $.ajax({
      url: './properties/Photo/' + movingPhotoId,
      data: {
        varname: 'move',
        newPosition: newPosition
      },
      dataType: 'json',
      type: 'patch'
    }).done(function (data) {
      if (data.success) {
        this.setState({
          currentPhotos: arrayMove(this.state.currentPhotos, oldIndex, newIndex)
        })
      }
    }.bind(this))
  }

  overlayOn() {
    this.setState({show: true})
  }

  overlayOff() {
    this.setState({show: false, newPhotos: []})
    loadPhotos.callback()
  }

  deletePhoto(photo, key) {
    $.ajax({
      url: './properties/Photo/' + photo.id,
      data: {
        propertyId: propertyId
      },
      dataType: 'json',
      method: 'DELETE',
      success: function (data) {
        let photos = this.state.currentPhotos
        if (data.success === true) {
          photos.splice(key, 1)
        }
        this.setState({currentPhotos: photos})
      }.bind(this),
      error: function () {}.bind(this)
    })
  }

  render() {
    let overlay
    if (this.state.show) {
      overlay = (<ImageOverlay
        deletePhoto={this.deletePhoto}
        close={this.overlayOff}
        clear={this.clearNewPhotos}
        update={this.addPhotos}
        newPhotos={this.state.newPhotos}
        currentPhotos={this.state.currentPhotos}
        status={this.state.status}
        onSortEnd={this.onSortEnd}/>)
    }
    return (
      <div>
        {overlay}
      </div>
    )
  }
}

PropertyImage.propTypes = {
  current: React.PropTypes.array
}
