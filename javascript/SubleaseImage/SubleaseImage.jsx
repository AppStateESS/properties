'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ImageOverlay from '../Mixin/Photo/ImageOverlay.jsx'
import bindMethods from '../Mixin/Helper/Bind.js'
import arrayMove from 'array-move'

/* global $, subleaseId, loadPhotos, currentPhotos */

export default class SubleaseImage extends Component {
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
      'delete',
      'onSortEnd',
      'rotate'
    ]
    bindMethods(methods, this)
  }

  componentDidMount() {
    $('#edit-photo-button').click(() => this.overlayOn())
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
      formData.append('photo', value)
      formData.append('subleaseId', subleaseId)
      $.ajax({
        url: './properties/SubleasePhoto',
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
          } else if (data.success === false) {
            alert(data.error)
            return
          }
          newPhotos.push(data.photo)
          status[key] = data.success
          this.setState(
            {status: status, currentPhotos: currentPhotos, newPhotos: newPhotos}
          )
        }.bind(this),
        error: function () {
          alert(
            'Sorry but your file is unacceptable. It may be of the wrong type or too large.' +
            ' Please try again.'
          )
        }.bind(this)
      })
    }.bind(this))
  }

  overlayOn() {
    this.setState({show: true})
  }

  overlayOff() {
    this.setState({show: false, newPhotos: []})
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
      success: function () {
        this.forceUpdate()
      }.bind(this),
      error: function () {}.bind(this)
    })
  }

  delete(photo, key) {
    $.ajax({
      url: './properties/SubleasePhoto/' + photo.id,
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
      type: 'patch'
    }).done(function (data) {
      if (data.success) {
        this.setState({
          currentPhotos: arrayMove(this.state.currentPhotos, oldIndex, newIndex)
        })
      }
    }.bind(this))
  }

  render() {
    return (
      <div>
        <ImageOverlay
          show={this.state.show}
          deletePhoto={this.delete}
          rotate={this.rotate}
          close={this.overlayOff}
          clear={this.clearNewPhotos}
          update={this.addPhotos}
          newPhotos={this.state.newPhotos}
          currentPhotos={this.state.currentPhotos}
          onSortEnd={this.onSortEnd}
          status={this.state.status}/>
      </div>
    )
  }
}

SubleaseImage.propTypes = {
  current: PropTypes.array
}
