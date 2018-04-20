'use strict'
import React from 'react'
import Waiting from '../Mixin/Html/Waiting.jsx'
import Message from '../Mixin/Html/Message.jsx'
import empty from '../Mixin/Helper/Empty.js'
import Base from '../Mixin/List/Base'
import PropertyListing from './PropertyListing.jsx'
import Dropdown from '../Mixin/Form/Dropdown.jsx'

/* global $ */

export default class ManagerDesktop extends Base {
  constructor(props) {
    super(props)
    this.state = {
      properties: null,
      message: null,
      messageType: null,
      moreRows: false
    }

    this.sortTypes = {
      alpha: 'Alphabetical',
      creatednew: 'Newest',
      createdold: 'Oldest',
      updated: 'Last update'
    }

    this.showActiveButton = false
    this.load()
    this.reactivate = this.reactivate.bind(this)
    this.showMore = this.showMore.bind(this)
    this.setMessage = this.setMessage.bind(this)
    this.clear = this.clear.bind(this)
  }

  updateLink() {
    const stateObj = {}
    const url = 'properties/Property/list/?' + $.param(this.searchVars)
    window.history.pushState(stateObj, "", url)
  }

  showMore() {
    this.searchVars.offset += 1
    this.load()
  }

  reactivate(key) {
    const {properties} = this.state
    const property = properties[key]
    $.ajax({
      url: 'properties/Property/' + property.id,
      data: {
        varname: 'active',
        value: 1
      },
      dataType: 'json',
      type: 'patch',
      success: function () {
        property.active = 1
        properties[key] = property
        this.setState({properties})
        //this.load()
      }.bind(this),
      error: function () {}.bind(this)
    })
  }

  load() {
    const sendData = this.searchVars
    if (this.searchVars.offset > 0) {
      sendData.offset = this.searchVars.offset
    }

    $.getJSON('./properties/Manager/mylist', sendData).done(function (data) {
      if (data.properties !== undefined) {
        if (this.searchVars.offset > 0) {
          this.setState({
            properties: this.state.properties.concat(data.properties),
            moreRows: data.more_rows,
          })
        } else {
          this.setState({properties: data.properties, moreRows: data.more_rows,})
        }
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
    this.setState({message: message, messageType: type,})
  }

  clear() {
    this.clearSearch()
    this.refs.propertySearch.value = ''
  }

  render() {
    let propertyList
    if (this.state.properties === null) {
      propertyList = <Waiting label="your properties"/>
    } else if (this.state.properties.length > 0) {
      propertyList = <PropertyListing list={this.state.properties} reactivate={this.reactivate}/>
    } else {
      propertyList = <p className="text-center">
        No properties found.
        <a href="./properties/Property/create">Click here to create a new property.</a>
      </p>
    }

    let message
    if (!empty(this.state.message)) {
      message = <Message type={this.state.messageType} message={this.state.message}/>
    }

    let sortLabel = 'Sort results by...'
    if (this.searchVars.sortBy) {
      sortLabel = 'Sort results by: ' + this.sortTypes[this.searchVars.sortBy]
    }

    const sortby = [
      {
        label: this.sortTypes.alpha,
        handleClick: this.updateSortBy.bind(null, 'alpha')
      }, {
        label: this.sortTypes.creatednew,
        handleClick: this.updateSortBy.bind(null, 'creatednew')
      }, {
        label: this.sortTypes.createdold,
        handleClick: this.updateSortBy.bind(null, 'createdold')
      }, {
        label: this.sortTypes.updated,
        handleClick: this.updateSortBy.bind(null, 'updated')
      },
    ]

    return (
      <div>
        <h2>My properties</h2>
        {message}
        <div className="row mb-1">
          <div className="col-sm-4">
            <div className="input-group">
              <input
                ref="propertySearch"
                className="form-control input-sm"
                type="text"
                placeholder="Search..."
                onChange={this.updateSearchString}/>
              <span className="input-group-btn">
                <button className="btn btn-outline-secondary btn-sm" type="button" onClick={this.clear}>Clear</button>
              </span>
            </div>
          </div>
          <div className="col-sm-4">
            <div><Dropdown label={sortLabel} options={sortby}/></div>
          </div>
        </div>
        {propertyList}
        {
          this.state.moreRows === true
            ? <div className="text-center">
                <button className="btn btn-primary" onClick={this.showMore}>Show more results</button>
              </div>
            : null
        }
      </div>
    )
  }
}
