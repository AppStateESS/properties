'use strict'
import React from 'react'
import DecodeUrl from '../Mixin/DecodeUrl.js'
import PropertyRow from './PropertyRow.jsx'
import Waiting from '../Mixin/Waiting.jsx'

/* global $ */

class Property extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      properties: null,
      manager: null
    }
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
    $.getJSON('./properties/Property', {managerId: this.managerId}).done(function (data) {
      this.setState({properties: data.properties, manager: data.manager})
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

class PropertyListing extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const list = this.props.list

    if (list === null) {
      return <Waiting label="properties"/>
    } else if (list.length === 0) {
      return <div className="lead">No properties found.</div>
    } else {
      return this.state.properties.map(function (value, key) {
        return <PropertyRow {...value} key={key}/>
      })
    }
  }
}

PropertyListing.propTypes = {
  list : React.PropTypes.array
}

export default Property
