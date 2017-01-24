'use strict'
import React from 'react'
//import empty from '../Mixin/Empty.js'
import bindMethods from '../Mixin/Bind.js'
//import DecodeUrl from '../Mixin/DecodeUrl.js'
//import setIfDefined from '../Mixin/setIfDefined.js'
import Listing from './Listing.jsx'
/* global $ */

export default class Property extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subleases: null
    }
    bindMethods([], this)
  }

  componentDidMount() {
    this.load()
  }

  load() {
    $.getJSON('./properties/Sublease/list', {}).done(function(data) {
      this.setState({subleases : data.subleases})
    }.bind(this))
  }

  render() {
    return (
      <div>
        <Listing subleases={this.state.subleases}/>
      </div>
    )
  }
}
