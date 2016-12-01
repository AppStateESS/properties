'use strict'
import React from 'react'
import DecodeUrl from '../Mixin/DecodeUrl.js'
import PropertyListing from './PropertyListing.jsx'
import bindMethods from '../Mixin/Bind.js'
import empty from '../Mixin/Empty.js'
import PropertyBar from './PropertyBar.jsx'
import Message from '../Mixin/Message.jsx'
import setIfDefined from '../Mixin/setIfDefined.js'

/* global $ */

export default class Property extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      properties: null,
      manager: null,
      message: '',
      type: null
    }

    this.delay
    this.search
    this.searchVars = {
      beds: '1',
      baths: '1',
      minprice: '0',
      maxprice: '0'
    }
    this.loadAmenities()
    this.managerId = 0
    bindMethods([
      'load',
      'updateSearchVars',
      'clearSearch',
      'updateSearchString',
      'clearAmenities',
      'toggle'
    ], this)
  }

  clearAmenities() {
    this.searchVars.furnished = null
    this.searchVars.ac = null
    this.searchVars.pets = null
    this.searchVars.utils = null
    this.searchVars.appalcart = null
    this.searchVars.campus = null
    this.searchVars.dishwasher = null
    this.searchVars.laundry = null
    this.searchVars.clubhouse = null
    this.searchVars.efficiency = null
    this.searchVars.apartment = null
    this.searchVars.house = null
    this.searchVars.condo = null
    this.searchVars.townhouse = null
    this.searchVars.duplex = null
    this.load()
    this.updateLink()
  }

  loadAmenities() {
    const url = new DecodeUrl

    this.searchVars = {
      beds: setIfDefined(url.values, 'beds', '1'),
      baths: setIfDefined(url.values, 'baths', '1'),
      furnished: setIfDefined(url.values, 'furnished'),
      ac: setIfDefined(url.values, 'ac'),
      pets: setIfDefined(url.values, 'pets'),
      utils: setIfDefined(url.values, 'utils'),
      minprice: setIfDefined(url.values, 'minprice', '0'),
      maxprice: setIfDefined(url.values, 'maxprice', '0'),
      appalcart: setIfDefined(url.values, 'appalcart', '0'),
      campus: setIfDefined(url.values, 'campus', '0'),
      dishwasher: setIfDefined(url.values, 'dishwasher', '0'),
      laundry: setIfDefined(url.values, 'laundry', '0'),
      clubhouse: setIfDefined(url.values, 'clubhouse', '0'),
      efficiency: setIfDefined(url.values, 'efficiency', '0'),
      apartment: setIfDefined(url.values, 'apartment', '0'),
      house: setIfDefined(url.values, 'house', '0'),
      condo: setIfDefined(url.values, 'condo', '0'),
      townhouse: setIfDefined(url.values, 'townhouse', '0'),
      duplex: setIfDefined(url.values, 'duplex', '0')
    }
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

  clearSearch() {
    this.search = ''
    this.load()
  }

  updateLink() {
    const stateObj = {}
    const url = 'properties/?' + $.param(this.searchVars)

    window.history.pushState(stateObj, "", url)
  }

  updateSearchVars(varname, value)
  {
    this.searchVars[varname] = value
    this.load()
    this.updateLink()
  }

  toggle(type) {
    this.updateSearchVars(type, this.searchVars[type] === '1'
      ? undefined
      : '1')
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

  updateSearchString(e) {
    clearTimeout(this.delay)
    const search = e.target.value
    if (search.length < 4 && search.length > 0) {
      return
    }
    this.delay = setTimeout(function () {
      this.search = search
      this.load()
    }.bind(this, search), 500)
  }

  render() {
    let manager = 'All managers'
    if (this.state.manager) {
      manager = this.state.manager.company_name
    }

    let message
    if (this.state.message.length > 0) {
      message = <Message message={this.state.message} type={this.state.type}/>
    }
    return (
      <div>
        {message}
        <h3>Properties: {manager}</h3>
        <PropertyBar
          updateSearchString={this.updateSearchString}
          clear={this.clearSearch}
          updateSearchVars={this.updateSearchVars}
          searchVars={this.searchVars}
          clearAmenities={this.clearAmenities}
          toggle={this.toggle}/>
        <PropertyListing list={this.state.properties} search={!empty(this.search)}/>
      </div>
    )
  }
}
