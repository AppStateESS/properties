'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import bindMethods from '../Mixin/Helper/Bind.js'
import Listing from './Listing.jsx'
import SearchBar from '../Mixin/List/SearchBar.jsx'
import Base from '../Mixin/List/Base.jsx'
/* global $ */

export default class Property extends Base {
  constructor(props) {
    super(props)
    this.state = {
      subleases: null
    }
    bindMethods(['load'], this)
  }

  componentDidMount() {
    this.load()
  }

  load() {
    $.getJSON('./properties/Sublease/list', {
      sortType: this.sortType,
      offset: this.offset
    }).done(function (data) {
      this.setState({subleases: data.subleases})
    }.bind(this))
  }

  updateLink() {
    const stateObj = {}
    const url = 'properties/Sublease/list/?' + $.param(this.searchVars)

    window.history.pushState(stateObj, "", url)
  }

  render() {
    return (
      <div className="sublease-list">
        <h2>Subleases</h2>
        <SearchBar
          updateSearchString={this.updateSearchString}
          clear={this.clearSearch}
          updateSearchVars={this.updateSearchVars}
          searchVars={this.searchVars}
          clearAmenities={this.clearAmenities}
          resetConditions={this.resetConditions}
          updateSortBy={this.updateSortBy}
          sortType={this.sortType}
          toggle={this.toggle}/>
        <Listing subleases={this.state.subleases}/>
      </div>
    )
  }
}
