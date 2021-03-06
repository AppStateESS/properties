'use strict'
import React, {Component} from 'react'
import DatePicker from 'react-date-picker'
import Waiting from '../Mixin/Html/Waiting.jsx'
import bindMethods from '../Mixin/Helper/Bind.js'
import ManagerRow from './ManagerRow.jsx'

/* global $ */

export default class ActivityReport extends Component {
  constructor(props) {
    super(props)
    this.selected = false
    this.state = {
      activityDate: new Date,
      listing: null,
      checkAll: false
    }
    const methods = [
      'setActivityDate',
      'deleteManager',
      'deactivateManager',
      'getListing',
      'delete',
      'load',
      'getRows',
      'toggle',
      'toggleAll',
      'showActions',
      'runList'
    ]
    bindMethods(methods, this)
  }

  componentDidMount() {
    this.load()
  }

  getListing() {
    switch (this.state.listing) {
      case null:
        return <Waiting label="landlords"/>

      case 0:
        return <p>Choose a date and refresh the listing.</p>

      default:
        return this.getRows()
    }
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

  delete(value) {
    return $.ajax({
      url: 'properties/Manager/' + value.id,
      dataType: 'json',
      type: 'delete'
    })
  }

  deactivate(value) {
    return $.ajax({
      url: 'properties/Manager/' + value.id,
      data: {
        varname: 'active',
        value: 0
      },
      dataType: 'json',
      type: 'patch'
    })
  }

  runList(commandName) {
    if (this.state.listing === null || this.state.listing[0] === null) {
      return
    }
    let holdEvent = []

    this.state.listing.forEach(function (value, key) {
      if (value.checked === true) {
        holdEvent.push(this[commandName](value, key))
      }
    }.bind(this))

    $.when.apply(null, holdEvent).done(function () {
      this.load()
      this.selected = false
    }.bind(this))
  }

  deleteManager() {
    this.runList('delete')
  }

  deactivateManager() {
    this.runList('deactivate')
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

  getRows() {
    let listing
    listing = this.state.listing.map(function (value, key) {
      return <ManagerRow value={value} key={key} toggle={this.toggle.bind(this, key)}/>
    }.bind(this))
    const cbStyle = {
      width: '80px'
    }

    const activeStyle = {
      width: '100px'
    }
    return (
      <div className="scroll-table">
        <table className="table table-striped">
          <tbody>
            <tr>
              <th style={cbStyle}><input type="checkbox" onChange={this.toggleAll} checked={this.selected}/></th>
              <th style={activeStyle}>Active</th>
              <th>Company</th>
              <th>Properties</th>
              <th>Last logged</th>
            </tr>
            {listing}
          </tbody>
        </table>
      </div>
    )
  }

  setActivityDate(value) {
    this.setState({activityDate: value})
    this.load()
  }

  load() {
    const {activityDate} = this.state
    const formatDate = `${activityDate.getFullYear()}-${activityDate.getMonth() + 1}-${activityDate.getDate()}`
    $.getJSON('./properties/Reports/inactivity', {date: formatDate}).done(
      function (data) {
        this.setState({listing: data.list})
      }.bind(this)
    )
  }

  render() {
    let actions
    if (this.selected) {
      actions = (
        <span>
          <button className="ml-1 btn btn-danger" onClick={this.deleteManager}>Delete</button>
          <button className="ml-1 btn btn-warning" onClick={this.deactivateManager}>Deactivate</button>
        </span>
      )
    }
    const activityDate = new Date(this.state.activityDate)
    return (
      <div>
        <h2>Manager activity</h2>
        <label>Show before:</label>&nbsp;
        <DatePicker
          dateFormat="YYYY-MM-DD"
          onChange={this.setActivityDate}
          value={activityDate}/>
        <button className="ml-1 btn btn-primary" onClick={this.load}>Refresh listing</button>
        {actions}
        <hr/>
        <div className="activity-listing">
          {this.getListing()}
        </div>
      </div>
    )
  }
}

ActivityReport.propTypes = {}
