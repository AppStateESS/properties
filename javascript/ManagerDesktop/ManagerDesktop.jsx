'use strict'
import React from 'react'
import Waiting from '../Mixin/Html/Waiting.jsx'
import Message from '../Mixin/Html/Message.jsx'
import empty from '../Mixin/Helper/Empty.js'
import PropertyListing from './PropertyListing.jsx'

/* global $ */

export default class ManagerDesktop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      properties: null,
      manager: null,
      message: null,
      messageType: null
    }
    this.load()
    this.managerId = 1
  }

  load() {
    $.getJSON('./properties/Manager/mylist').done(function (data) {
      if (data.properties !== undefined) {
        this.setState({properties: data.properties, manager: data.manager})
      } else if (data.error) {
        this.setState({properties: []})
        this.setMessage(data.error)
      }
    }.bind(this)).fail(function () {
      this.setState({properties: []})
      this.setMessage('Error: failure pulling properties', 'danger')
    }.bind(this))
  }

  setMessage(message, type) {
    this.setState({message: message, messageType: type})
  }

  render() {
    let propertyList
    if (this.state.properties === null) {
      propertyList = <Waiting label="your properties"/>
    } else if (this.state.properties.length > 0) {
      propertyList = <PropertyListing list={this.state.properties}/>
    } else {
      propertyList = <p className="text-center">
        No properties found. <a href="./properties/Property/create">Click here to create a new property.</a>
      </p>
    }

    let message
    if (!empty(this.state.message)) {
      message = <Message type={this.state.messageType} message={this.state.message}/>
    }
    return (
      <div>
        <h2>My properties</h2>
        {message}
        {propertyList}
      </div>
    )
  }
}

ManagerDesktop.propTypes = {}
