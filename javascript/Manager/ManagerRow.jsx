'use strict'
import React from 'react'
import Dropdown from '../Mixin/Dropdown.jsx'

/* global $ */

class ManagerRow extends React.Component {
  constructor(props) {
    super(props)
    this.delete = this.delete.bind(this)
    this.activate = this.activate.bind(this)
    this.deactivate = this.deactivate.bind(this)
  }

  delete() {
    if (prompt("Deleting this manager will remove their account and all their properties.\nType " +
        "'DELETE' to confirm") === 'DELETE') {
      $.ajax({
        url: './properties/Manager/?managerId=' + this.props.id,
        dataType: 'json',
        type: 'delete'
      }).done(function (data) {
        if (data.success === true) {
          this.props.reload()
        }
      }.bind(this))
    }
  }

  activate() {
    $.ajax({
      url: './properties/Manager',
      type: 'patch',
      data: {
        param: 'active',
        active: true,
        managerId: this.props.id
      }
    }).done(function () {
      this.props.reload()
    }.bind(this))
  }

  deactivate() {
    $.ajax({
      url: './properties/Manager',
      type: 'patch',
      data: {
        param: 'active',
        active: false,
        managerId: this.props.id
      }
    }).done(function () {
      this.props.reload()
    }.bind(this))
  }

  render() {
    const phone = this.props.phone
    const call = 'tel:+1' + this.props.phone
    const email = 'mailto:' + this.props.email_address
    let lastLog = 'Never'
    let companyName = this.props.company_name
    const active = this.props.active === '1'
      ? <i
          className="text-success fa fa-lg fa-check-circle"
          role="button"
          title="Click to deactivate"
          onClick={this.deactivate}></i>
      : <i
        className="text-danger fa fa-lg fa-times-circle"
        role="button"
        title="Click to activate"
        onClick={this.activate}></i>

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
        label: 'Properties',
        icon: <i className="fa fa-building"></i>,
        handleClick: function(){window.location.href = './properties/Property/Manager/' + this.props.id}.bind(this)
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
          {companyName}<br/>
        </td>
        <td>
          <a href={email}>{this.props.first_name} {this.props.last_name}&nbsp;
            <i className="fa fa-envelope-o"></i>
          </a><br />
          <a href={call}>{phone}</a>
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
  property_count: React.PropTypes.string,
  active: React.PropTypes.string,
  fillForm: React.PropTypes.func,
  remove: React.PropTypes.func,
  reload: React.PropTypes.func,
  showProperties: React.PropTypes.func
}

export default ManagerRow
