'use strict'
import React from 'react'
import Dropdown from '../Mixin/Dropdown.jsx'

class ManagerRow extends React.Component {
  constructor(props) {
    super(props)
    this.delete = this.delete.bind(this)
  }

  delete() {
    prompt('Are you sure?')
  }

  render() {
    const phone = this.props.phone
    const call = 'tel:+1' + this.props.phone
    const email = 'mailto:' + this.props.email_address
    let lastLog = 'Never'
    let companyName = this.props.company_name
    const active = this.props.active === '1'
      ? <i className="text-success fa fa-lg fa-check-circle" role="button" title="Click to deactivate"></i>
      : <i className="text-danger fa fa-lg fa-times-circle" role="button" title="Click to activate"></i>

    if (this.props.last_log > 0) {
      let lastDate = new Date(this.props.last_log * 1000)
      lastLog = lastDate.toDateString()
    }
    if (this.props.company_url.length > 0) {
      companyName = <a href={this.props.company_url}>{companyName}</a>
    }

    const options = [
      {
        label: 'Edit',
        icon: <i className="fa fa-pencil-square-o"></i>,
        handleClick: this.props.fillForm
      },
      {
        label: 'Delete',
        icon: <i className="fa fa-trash"></i>,
        handleClick: this.delete
      }
    ]

    return (
      <tr>
        <td><input type="checkbox"/></td>
        <td>
          {active}
        </td>
        <td>
          {companyName}<br />
        </td>
        <td>
          <a href={call}>{phone}</a><br />
          <a href={email}>{this.props.first_name} {this.props.last_name}&nbsp;
          <i className="fa fa-envelope-o"></i>
          </a>
        </td>
        <td>
          {lastLog}
        </td>
        <td>
          <Dropdown options={options} label="Options"/>
        </td>
      </tr>
    )
  }
}

ManagerRow.defaultProps = {
  phone: '',
  email_address: '',
  last_log: 0,
  company_url: '',
  first_name: '',
  last_name: ''
}

ManagerRow.propTypes = {
  id: React.PropTypes.string,
  phone: React.PropTypes.string,
  email_address: React.PropTypes.string,
  company_name: React.PropTypes.string,
  company_url: React.PropTypes.string,
  first_name: React.PropTypes.string,
  last_name: React.PropTypes.string,
  last_log: React.PropTypes.string,
  active: React.PropTypes.string,
  fillForm: React.PropTypes.func
}

export default ManagerRow
