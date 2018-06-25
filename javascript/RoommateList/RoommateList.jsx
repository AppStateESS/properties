'use strict'
import React, {Component} from 'react'
import RoommateRow from './RoommateRow.jsx'
import Waiting from '../Mixin/Html/Waiting.jsx'
import SearchBar from './SearchBar.jsx'
import bindMethods from '../Mixin/Helper/Bind.js'
import {profileLabel} from '../Mixin/Objects/ProfileData.js'

/* global $ */

export default class RoommateList extends Component {
  constructor(props) {
    super(props)
    this.error = false
    this.state = {
      roommates: null,
      labels: {
        focus: 'College focus',
        wake_time: 'Wake up preference',
        pets: 'Pets',
        free_time: 'Spends free time',
        sleep_time: 'Bed time preference',
        smoking: 'Smoking'
      },
      searchVars: {
        focus: null,
        wake_time: null,
        sleep_time: null,
        pets: null,
        smoking: null,
        free_time: null,
        offset: 0,
      },
      moreRows: true,
    }
    bindMethods([
      'updateSearchVars', 'reset', 'showMore'
    ], this)
  }

  componentDidMount() {
    this.load()
  }

  reset() {
    this.defaultLabels()
    this.clearVars()
  }
  
  showMore() {
    const searchVars = this.state.searchVars
    searchVars.offset = parseInt(searchVars.offset) + 1
    this.setState({searchVars : searchVars})
    this.load()
  }

  clearVars() {
    const searchVars = {
      focus: null,
      wake_time: null,
      sleep_time: null,
      pets: null,
      smoking: null,
      free_time: null,
      offset: 0,
    }
    this.setState({searchVars: searchVars}, this.load)
  }

  defaultLabels() {
    const labels = {
      focus: 'College focus',
      wake_time: 'Wake up preference',
      pets: 'Pets',
      free_time: 'Spends free time',
      sleep_time: 'Bed time preference',
      smoking: 'Smoking'
    }
    this.setState({labels: labels})
  }

  updateSearchVars(varname, value) {
    let searchVars = this.state.searchVars
    let labels = this.state.labels
    searchVars[varname] = value
    labels[varname] = profileLabel[varname][value]
    this.setState({searchVars: searchVars, labels: labels}, this.load)
  }

  load() {
    const sendData = this.state.searchVars
    if (this.state.searchVars.offset > 0) {
      sendData.offset = this.state.searchVars.offset
    }
    $.getJSON('./properties/Roommate/list', sendData).done(function (data) {
      if (this.state.searchVars.offset > 0) {
        if (data.roommates.length == 0 || this.state.roommates == null) {
          this.clearVars()
          return
        }
        this.setState({
          roommates: this.state.roommates.concat(data.roommates),
          moreRows: data.more_rows
        })
      } else {
        this.setState(
          {roommates: data.roommates, manager: data.manager, moreRows: data.more_rows}
        )
      }
    }.bind(this)).fail(function(){
      this.error = true
      this.setState({roommates: []})
    }.bind(this))
  }

  render() {
    let rows

    let message
    if (this.error) {
      message = <div className="alert alert-warning">An error occurred when trying to access the roommate list. Please contact the site administrators.</div>
    }

    if (this.state.roommates === null) {
      return <Waiting label="Roommates"/>
    } else if (this.state.roommates.length === 0) {
      rows = <div className="well">
        <p>No roommates found.</p>
      </div>
    } else {
      rows = this.state.roommates.map(function (value, key) {
        return (<RoommateRow roommate={value} key={key}/>)
      })
    }

    return (
      <div>
        <h2>Roommate listing</h2>
        {message}
        <SearchBar
          updateSearchVars={this.updateSearchVars}
          searchVars={this.state.searchVars}
          labels={this.state.labels}
          reset={this.reset}/>
        <div>{rows}</div>
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

RoommateList.propTypes = {}
