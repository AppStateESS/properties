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
      status: []
    }
    const methods = [
      'overlayOn',
      'overlayOff',
      'addPhotos',
      'delete',
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
      url: './properties/SubleasePhoto',
      data: {subleaseId},
      dataType: 'json',
      type: 'get',
      success: (data)=>{
        this.setState({currentPhotos: data})
      },
      error: ()=>{}
    })
  }

  addPhotos(photos) {
    let status = this.state.status
    $.each(photos, (key, value) => {
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
        success: (data) => {
          if (data.success === true) {
            this.load()
          } else if (data.success === false) {
            alert(data.error)
            return
          }
          status[key] = data.success
          this.setState(
            {status: status}
          )
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
      error: ()=> {}
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
      error: ()=> {}
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
          update={this.addPhotos}
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
