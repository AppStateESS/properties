'use strict'
import React from 'react'
import DecodeUrl from '../Mixin/DecodeUrl.js'
import Waiting from '../Mixin/Waiting.jsx'
import PropertyListing from './PropertyListing.jsx'

/* global $ */

export default class Property extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      properties: null,
      manager: null
    }
    this.search = ''
    this.managerId = 0
    this.bindMethods()
  }

  componentDidMount() {
    const decode = new DecodeUrl
    this.managerId = decode.values.managerId
    this.load()
  }

  setManagerId(id) {
    this.managerId = id
  }

  bindMethods() {
    let bindable = ['load']

    bindable.map(function (v) {
      this[v] = this[v].bind(this)
    }.bind(this))
  }

  load() {
    $.getJSON('./properties/Property', {
      managerId: this.managerId,
      search: this.search
    }).done(function (data) {
      this.setState({properties: data.properties, manager: data.manager})
    }.bind(this)).fail(function () {
      this.setState({managers: null, loading: false})
      this.setMessage('Error: failure pulling properties')
    }.bind(this))
  }

  render() {
    let manager = 'All managers'
    if (this.state.manager) {
      manager = this.state.manager.company_name
    }

    return (
      <div>
        <h3>Properties: {manager}</h3>
        <div><PropertyListing list={this.state.properties}/></div>
      </div>
    )
  }
}
