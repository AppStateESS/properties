'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import 'react-date-picker/index.css'
import ActivityReport from './ActivityReport.jsx'
import StudentReport from './StudentReport.jsx'
import bindMethods from '../Mixin/Helper/Bind.js'
import Dropdown from '../Mixin/Form/Dropdown.jsx'

class Reports extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      report: null,
      activityDate: this.today,
      inactiveList: 0
    }
    const methods = ['getReportList', 'showReport']
    bindMethods(methods, this)
  }

  pickReport(report) {
    this.setState({report: report})
  }

  getReportList() {
    return [
      {
        label: 'Inactive managers',
        handleClick: this.pickReport.bind(this, 'inactiveManagers')
      },
      {
        label: 'Student report',
        handleClick: this.pickReport.bind(this, 'studentReport')
      }
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
        <Dropdown label="Choose report" options={this.getReportList()}/>
        <hr/> {this.showReport()}
      </div>
    )
  }
}

ReactDOM.render(
  <Reports/>, document.getElementById('reports'))
