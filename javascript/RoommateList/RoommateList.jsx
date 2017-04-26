'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import RoommateRow from './RoommateRow.jsx'
import Waiting from '../Mixin/Html/Waiting.jsx'
import SearchBar from './SearchBar.jsx'
import bindMethods from '../Mixin/Helper/Bind.js'
import {profileLabel} from '../Mixin/Objects/ProfileData.js'

/* global $ */

export default class RoommateList extends Component {
  constructor(props) {
    super(props)
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
        free_time: null
      }
    }
    bindMethods([
      'updateSearchVars', 'reset'
    ], this)
  }

  componentDidMount() {
    this.load()
  }

  reset() {
    this.defaultLabels()
    this.clearVars()
  }

  clearVars() {
    const searchVars = {
      focus: null,
      wake_time: null,
      sleep_time: null,
      pets: null,
      smoking: null,
      free_time: null
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
    $.getJSON('./properties/Roommate/list', this.state.searchVars).done(function (data) {
      if (data.roommates) {
        this.setState({roommates: data.roommates})
      } else {
        this.setState({roommates: []})
      }
    }.bind(this))
  }

  render() {
    let rows

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
        <SearchBar
          updateSearchVars={this.updateSearchVars}
          searchVars={this.state.searchVars}
          labels={this.state.labels}
          reset={this.reset}/>
        <div>{rows}</div>
      </div>
    )
  }
}

RoommateList.propTypes = {}
