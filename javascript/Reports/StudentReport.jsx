'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {DateField} from 'react-date-picker'
import Waiting from '../Mixin/Html/Waiting.jsx'
import bindMethods from '../Mixin/Helper/Bind.js'
import StudentRow from './StudentRow.jsx'

/* global $ */

export default class StudentReport extends Component {
  constructor(props) {
    super(props)
    this.selected = false
    this.state = {
      searchDate: moment().subtract(1, 'year').format('YYYY-MM-DD'),
      listing: null,
      checkAll: false
    }
    const methods = [
      'setSearchDate',
      'load',
      'getListing',
      'toggleAll',
      'getRows',
      'setSearchDate',
      'toggle',
      'showActions',
      'deleteStudent'
    ]
    bindMethods(methods, this)
  }

  componentDidMount() {
    this.load()
  }

  toggle(key) {
    let listing = this.state.listing
    if (listing[key].checked === undefined || listing[key].checked === false) {
      listing[key].checked = true
      this.selected = true
    } else {
      listing[key].checked = false
      this.showActions()
    }
    this.setState({listing})
  }

  toggleAll() {
    const listing = this.state.listing
    const checkAll = !this.state.checkAll
    listing.map(function (value) {
      value.checked = checkAll
    })
    this.setState({listing: listing, checkAll: checkAll})
    this.showActions()
  }

  showActions() {
    this.selected = this.state.listing.some(function (value) {
      return value.checked === true
    })
  }

  load() {
    $.getJSON('./properties/Reports/students', {date: this.state.searchDate}).done(function (data) {
      this.setState({listing: data.list})
    }.bind(this))
  }

  delete(value) {
    return $.ajax({
      url: 'properties/Reports/' + value.id + '/student',
      dataType: 'json',
      type: 'delete'
    })
  }

  deleteStudent() {
    if (this.state.listing === null || this.state.listing[0] === null) {
      return
    }
    let holdEvent = []

    this.state.listing.forEach(function (value) {
      if (value.checked === true) {
        holdEvent.push(this.delete(value))
      }
    }.bind(this))

    $.when.apply(null, holdEvent).done(function () {
      this.selected = false
      this.load()
    }.bind(this))
  }

  getListing() {
    switch (this.state.listing) {
      case null:
        return <Waiting label="students"/>

      case 0:
        return <p>Choose a date and refresh the listing.</p>

      default:
        return this.getRows()
    }
  }

  setSearchDate(value) {
    this.setState({searchDate: value})
    this.load()
  }

  getRows() {
    let listing
    listing = this.state.listing.map(function (value, key) {
      return <StudentRow value={value} key={key} toggle={this.toggle.bind(this, key)}/>
    }.bind(this))

    return (
      <div className="scroll-table">
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{
                width: '100px'
              }}><input type="checkbox" onChange={this.toggleAll} checked={this.selected}/></th>
              <th>User name</th>
              <th>Last logged</th>
            </tr>
          </thead>
          <tbody>
            {listing}
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    let actions
    if (this.selected) {
      actions = (
        <span>
          <button className="marginLeft btn btn-danger" onClick={this.deleteStudent}>Delete</button>
        </span>
      )
    }
    return (
      <div>
        <DateField
          dateFormat="YYYY-MM-DD"
          onChange={this.setSearchDate}
          value={this.state.searchDate}/>
        <button className="marginLeft btn btn-primary" onClick={this.load}>Refresh listing</button>
        {actions}
        <hr/>
        <div className="student-listing">
          {this.getListing()}
        </div>
      </div>
    )
  }
}

StudentReport.propTypes = {}
