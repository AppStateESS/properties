'use strict'
import React from 'react'
import empty from '../Mixin/Empty.js'
import bindMethods from '../Mixin/Bind.js'
import Message from '../Mixin/Message.jsx'
import SearchBar from '../Mixin/Place/SearchBar.jsx'
import DecodeUrl from '../Mixin/DecodeUrl.js'
import PropertyListing from './PropertyListing.jsx'
import Place from '../Mixin/Place/Place.jsx'


/* global $ */

export default class Property extends Place {
  constructor(props) {
    super(props)
    this.state = {
      properties: null,
      manager: null,
      message: '',
      type: null
    }

    this.managerId = 0
    bindMethods([
      'load',
      'resetConditions',

    ], this)
  }

  componentDidMount() {
    const decode = new DecodeUrl
    this.managerId = decode.values.managerId
    this.load()
  }

  setMessage(message, type) {
    this.setState({message: message, type: type})
  }

  setManagerId(id) {
    this.managerId = id
  }

  updateLink() {
    const stateObj = {}
    const url = 'properties/Property/list/?' + $.param(this.searchVars)

    window.history.pushState(stateObj, "", url)
  }

  processAjaxData(response, urlPath) {
    document.getElementById("content").innerHTML = response.html
    document.title = response.pageTitle
    window.history.pushState({
      "html": response.html,
      "pageTitle": response.pageTitle
    }, "", urlPath)
  }

  load() {
    this.setState({properties: null})
    const sendData = this.searchVars
    sendData.managerId = this.managerId
    sendData.search = this.search
    $.getJSON('./properties/Property', sendData).done(function (data) {
      this.setState({properties: data.properties, manager: data.manager})
    }.bind(this)).fail(function () {
      this.setState({managers: null, loading: false})
      this.setMessage('Error: failure pulling properties')
    }.bind(this))
  }

  render() {
    let manager = 'All managers'
    if (this.state.manager) {
      const managerLink = `./properties/Manager/${this.state.manager.id}/view`
      manager = <span><a href={managerLink}>{this.state.manager.company_name}</a></span>
    }

    let message
    if (this.state.message.length > 0) {
      message = <Message message={this.state.message} type={this.state.type}/>
    }
    return (
      <div>
        {message}
        <h3>Properties: {manager}</h3>
        <SearchBar
          updateSearchString={this.updateSearchString}
          clear={this.clearSearch}
          updateSearchVars={this.updateSearchVars}
          searchVars={this.searchVars}
          clearAmenities={this.clearAmenities}
          resetConditions={this.resetConditions}
          toggle={this.toggle}/>
        <PropertyListing list={this.state.properties} search={!empty(this.search)}/>
      </div>
    )
  }
}
