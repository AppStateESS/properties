'use strict'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import ActivityReport from './ActivityReport.jsx'
import StudentReport from './StudentReport.jsx'
import bindMethods from '../Mixin/Helper/Bind.js'
import Dropdown from '../Mixin/Form/Dropdown.jsx'

/* global $ */

class Reports extends Component {
  constructor(props) {
    super(props)

    this.state = {
      report: null,
      activityDate: this.today,
      inactiveList: 0,
      propertyCount: 0,
      managerCount: 0,
      subleaseCount: 0,
      roommateCount: 0,
    }
    const methods = ['getReportList', 'showReport', 'managerReportForward']
    bindMethods(methods, this)
  }

  componentDidMount() {
    this.load()
  }

  load() {
    $.getJSON('./properties/Reports/overview').done(function (data) {
      this.setState({propertyCount: data.property_count, managerCount: data.manager_count, subleaseCount: data.sublease_count, roommateCount: data.roommate_count})
    }.bind(this))
  }

  pickReport(report) {
    this.setState({report: report})
  }

  managerReportForward() {
    window.location.href = 'properties/Reports/download'
  }

  getReportList() {
    return [
      {
        label: 'Manager activity',
        handleClick: this.pickReport.bind(this, 'inactiveManagers')
      }, {
        label: 'Student activity',
        handleClick: this.pickReport.bind(this, 'studentReport')
      }, {
        label: <span>Manager information&nbsp;<i className="fa fa-table"></i></span>,
        handleClick: this.managerReportForward
      },
    ]
  }

  showReport() {
    switch (this.state.report) {
      case null:
        return <p></p>

      case 'inactiveManagers':
        return <ActivityReport/>

      case 'studentReport':
        return <StudentReport/>
    }
  }

  render() {
    return (
      <div className="reports">
        <h2>Reports</h2>
        <div className="alert alert-info">
          <div className="row">
            <div className="col-sm-3 col-6">
              <strong>Total active properties:</strong> {this.state.propertyCount}
            </div>
            <div className="col-sm-3 col-6">
              <strong>Total active managers:</strong> {this.state.managerCount}
            </div>
            <div className="col-sm-3 col-6">
              <strong>Total active subleases:</strong> {this.state.subleaseCount}
            </div>
            <div className="col-sm-3 col-6">
              <strong>Total active roommates:</strong> {this.state.roommateCount}
            </div>
          </div>
        </div>
        <Dropdown label="Choose report" options={this.getReportList()}/>
        <hr/> {this.showReport()}
      </div>
    )
  }
}

ReactDOM.render(
  <Reports/>, document.getElementById('reports'))
