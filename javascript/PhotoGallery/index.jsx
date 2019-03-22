'use strict'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Gallery from 'react-grid-gallery'

/* global currentPhotos, propertyId, subleaseId, $ */

export default class PhotoGallery extends Component {
  constructor(props) {
    super(props)
    this.state = {photos: []}
  }
  
  componentDidMount(){
    this.setState({photos: currentPhotos})
    window.loadProp = () => {this.loadPropertyImages()}
    window.loadSub = () => {this.loadSubleaseImages()}
  }

  loadPropertyImages() {
    $.getJSON('./properties/Photo/list', {propertyId: propertyId}).done(
      function (data) {
        this.setState({photos: data})
      }.bind(this)
    )
  }
  
  loadSubleaseImages() {
    $.getJSON('./properties/SubleasePhoto/list', {subleaseId: subleaseId}).done(
      function (data) {
        this.setState({photos: data})
      }.bind(this)
    )
  }

  render() {
    return (
      <div>
        <Gallery images={this.state.photos} maxRows={2} enableImageSelection={false}/>
      </div>
    )
  }
}

ReactDOM.render(<PhotoGallery/>, document.getElementById('PhotoGallery'))
