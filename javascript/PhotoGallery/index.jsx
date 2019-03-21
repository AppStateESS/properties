'use strict'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Gallery from 'react-grid-gallery'

/* global currentPhotos */

export default class PhotoGallery extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (<div>
      <Gallery images={currentPhotos} maxRows={2} enableImageSelection={false}/>
    </div>)
  }
}

ReactDOM.render(<PhotoGallery/>, document.getElementById('PhotoGallery'))
