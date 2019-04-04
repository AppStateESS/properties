'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ImageOverlay from '../Mixin/Photo/ImageOverlay.jsx'
import bindMethods from '../Mixin/Helper/Bind.js'

/* global $, subleaseId, currentPhotos */

export default class SubleaseImage extends Component {
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
      'delete',
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
      url: './properties/SubleasePhoto',
      data: {
        subleaseId
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
      let formData = new FormData()
      formData.append('photo', photo.file)
      formData.append('subleaseId', subleaseId)
      const promise = $.ajax({
        url: './properties/SubleasePhoto',
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
        }
      })
      promises.push(promise)
    })
    Promise.all(promises).catch(() => {
      this.setState({errors: true})
    })
  }

  overlayOn() {
    this.setState({show: true})
  }

  overlayOff() {
    this.setState({show: false})
    window.loadSub()
  }

  rotate(photo, key, direction) {
    $.ajax({
      url: './properties/SubleasePhoto/' + photo.id + '/rotate',
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

  delete(photo) {
    $.ajax({
      url: './properties/SubleasePhoto/' + photo.id,
      dataType: 'json',
      method: 'DELETE',
      success: (data) => {
        if (data.success) {
          this.load()
        }
      },
      error: () => {}
    })
  }

  onSortEnd(movement) {
    const {oldIndex, newIndex} = movement
    const newPosition = this.state.currentPhotos[newIndex].porder
    const movingPhotoId = this.state.currentPhotos[oldIndex].id
    $.ajax({
      url: './properties/SubleasePhoto/' + movingPhotoId,
      data: {
        subleaseId: subleaseId,
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

  render() {
    return (
      <div>
        <ImageOverlay
          show={this.state.show}
          deletePhoto={this.delete}
          rotate={this.rotate}
          close={this.overlayOff}
          update={this.addPhoto}
          errors={this.state.errors}
          currentPhotos={this.state.currentPhotos}
          onSortEnd={this.onSortEnd}
          loading={this.state.loading}/>
      </div>
    )
  }
}

SubleaseImage.propTypes = {
  current: PropTypes.array
}
