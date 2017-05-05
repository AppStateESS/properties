'use strict'
import React from 'react'
import empty from '../Mixin/Helper/Empty.js'
import bindMethods from '../Mixin/Helper/Bind.js'
import Message from '../Mixin/Html/Message.jsx'
import SearchBar from '../Mixin/List/SearchBar.jsx'
import DecodeUrl from '../Mixin/Helper/DecodeUrl.js'
import PropertyListing from './PropertyListing.jsx'
import Base from '../Mixin/List/Base.jsx'

/* global $ */

export default class Property extends Base {
  constructor(props) {
    super(props)
    this.state = {
      properties: null,
      manager: null,
      message: '',
      type: null,
      moreRows : true,
    }
    this.showActiveButton = false
    this.managerId = 0
    bindMethods(['load'], this)
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
    const sendData = this.searchVars
    sendData.managerId = this.managerId
    if (this.offset > 0) {
      sendData.offset = this.offset
    }
    $.getJSON('./properties/Property', sendData).done(function (data) {
      // bad manager id
      if (data.manager === false) {
        this.setState({properties: [], manager: null, moreRows:false})
        return
      }
      if (data.active_button !== undefined) {
        this.showActiveButton = data.active_button
      }
      if (this.offset > 0) {
        this.setState({properties: this.state.properties.concat(data.properties), manager: data.manager, moreRows: data.more_rows})
      } else {
        this.setState({properties: data.properties, manager: data.manager, moreRows: data.more_rows})
      }
    }.bind(this)).fail(function () {
      this.setState({managers: null, loading: false})
      this.setMessage('Error: failure pulling properties')
    }.bind(this))
  }

  render() {
    let manager = 'All managers'
    if (this.state.manager) {
      const managerLink = `./properties/Manager/${this.state.manager.id}/view`
      manager = <span>
        <a href={managerLink}>{this.state.manager.company_name}</a>
      </span>
    }

    let message
    if (this.state.message.length > 0) {
      message = <Message message={this.state.message} type={this.state.type}/>
    }
    return (
      <div>
        {message}
        <h3><a href="./properties/Property/list/">Properties:</a> {manager}</h3>
        <SearchBar
          updateSearchString={this.updateSearchString}
          clear={this.clearSearch}
          updateSearchVars={this.updateSearchVars}
          searchVars={this.searchVars}
          clearAmenities={this.clearAmenities}
          resetConditions={this.resetConditions}
          showActiveButton={this.showActiveButton}
          updateSortBy={this.updateSortBy}
          sortType={this.sortType}
          toggle={this.toggle}/>
        <PropertyListing list={this.state.properties} search={!empty(this.search)}/>
        {this.state.moreRows === true ?
        <div className="text-center"><button className="btn btn-primary" onClick={this.showMore}>Show more results</button></div> : null}
      </div>
    )
  }
}
