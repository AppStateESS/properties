'use strict'
import React from 'react'
require('react-image-gallery/styles/css/image-gallery.css')
import ImageGallery from 'react-image-gallery'
import Waiting from '../Mixin/Waiting.jsx'

/* global $, require, propertyId, loadPhotos, currentPhotos */

export default class Photo extends React.Component {
  constructor() {
    super()
    this.state = {
      photos: null,
      fullscreen: false
    }
    this.toggleScreen = this.toggleScreen.bind(this)
  }

  componentDidMount() {
    this.setState({photos: currentPhotos})
    loadPhotos.callback = this.load.bind(this)
  }

  load() {
    $.getJSON('./properties/Photo/list', {propertyId: propertyId}).done(function (data) {
      currentPhotos = data
      this.setState({photos: data})
    }.bind(this))
  }

  toggleScreen() {
    this.setState({
      fullscreen: !this.state.fullscreen
    })
  }

  render() {
    let images
    if (this.state.photos === null) {
      images = <Waiting label="photos"/>
    } else if (this.state.photos.length > 0) {
      images = (<ImageGallery
        ref={i => this._imageGallery = i}
        items={this.state.photos}
        onScreenChange={this.toggleScreen}
        infinite={true}
        showFullscreenButton={true}
        showPlayButton={true}
        showThumbnails={!this.state.fullscreen}
        showIndex={true}
        showNav={true}
        slideInterval={4000}
        slideOnThumbnailHover={true}/>)
    } else {
      images = <div className="well text-center text-muted"><i className="fa fa-camera fa-5x"></i><br />No photos</div>
    }
    return (
      <div>{images}</div>
    )
  }
}
