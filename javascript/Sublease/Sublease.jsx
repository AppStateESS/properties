'use strict'
import React from 'react'
import empty from '../Mixin/Helper/Empty.js'
import bindMethods from '../Mixin/Helper/Bind.js'
import Listing from './Listing.jsx'
import SearchBar from '../Mixin/List/SearchBar.jsx'
import Base from '../Mixin/List/Base.jsx'
import ReactTooltip from 'react-tooltip'

/* global $ */

export default class Property extends Base {
  constructor(props) {
    super(props)
    this.state = {
      subleases: null,
      moreRows: true
    }
    this.loadAmenities()
    bindMethods(['load'], this)
  }

  componentDidMount() {
    this.load()
  }

  load() {
    const sendData = this.searchVars
    sendData.managerId = this.managerId
    if (this.searchVars.offset > 0) {
      sendData.offset = this.searchVars.offset
    }

    $.ajax({
      url: './properties/Sublease',
      data: sendData,
      dataType: 'json',
      type: 'get',
      success: (data) => {
        if (data.active_button !== undefined) {
          this.showActiveButton = data.active_button
        }
        if (this.searchVars.offset > 0) {
          if (data.subleases.length == 0 || this.state.subleases == null) {
            this.clearSearch()
            return
          }
          this.setState({
            subleases: this.state.subleases.concat(data.subleases),
            moreRows: data.more_rows
          })
        } else {
          this.setState({subleases: data.subleases, moreRows: data.more_rows})
        }
        ReactTooltip.rebuild()
      },
      error: () => {
        this.setState({loading: false})
        this.setMessage('Error: failure pulling subleases')
      }
    })

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
          facilities={false}
          toggle={this.toggle}/>
        <Listing subleases={this.state.subleases} search={!empty(this.search)}/> {
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
