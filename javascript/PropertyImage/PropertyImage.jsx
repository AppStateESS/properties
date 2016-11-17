'use strict'
import React from 'react'
import ImageOverlay from './ImageOverlay.jsx'
import bindMethods from '../Mixin/Bind.js'

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
      'delete',
      'setMain'
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

  overlayOn() {
    this.setState({show: true})
  }

  overlayOff() {
    this.setState({show: false, newPhotos: []})
    loadPhotos.callback()
  }

  delete(id, key) {
    $.ajax({
      url: './properties/Photo/' + id,
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

  setMain(id) {
    $.ajax({
      url: './properties/Photo/' + id,
      data: {
        varname: 'main_pic'
      },
      method: 'PATCH',
      success: function () {
        let photos = this.state.currentPhotos
        photos.forEach(function(value, idx, photos){
          photos[idx].main_pic = value.id == id ? '1' : '0'
        })
        this.setState({currentPhotos : photos})
      }.bind(this),
      error: function () {}.bind(this)
    })
  }

  render() {
    let overlay
    if (this.state.show) {
      overlay = (<ImageOverlay
        delete={this.delete}
        close={this.overlayOff}
        clear={this.clearNewPhotos}
        update={this.addPhotos}
        newPhotos={this.state.newPhotos}
        currentPhotos={this.state.currentPhotos}
        setMain={this.setMain}
        status={this.state.status}/>)
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
