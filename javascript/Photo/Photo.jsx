'use strict'
import React from 'react'
require('react-image-gallery/styles/css/image-gallery.css')
import ImageGallery from 'react-image-gallery'
import Waiting from '../Mixin/Waiting.jsx'

/* global $, require, propertyId */

export default class Photo extends React.Component {
  constructor() {
    super()
    this.state = {
      photos: null,
      thumbnail: true
    }
    this.load()
  }

  load() {
    $.getJSON('./properties/Photo/list', {propertyId: propertyId}).done(function (data) {
      this.setState({photos: data})
    }.bind(this))
  }

  toggleScreen() {
    this.setState({
      thumbnail: !this.state.thumbnail
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
        lazyLoad={false}
        infinite={true}
        showBullets={true}
        showFullscreenButton={true}
        showPlayButton={true}
        showThumbnails={this.state.thumbnail}
        showIndex={true}
        showNav={true}
        slideInterval={2000}
        slideOnThumbnailHover={true}/>)
    } else {
      images = <div>No photos for this property</div>
    }
    return (
      <div>{images}</div>
    )
  }
}
