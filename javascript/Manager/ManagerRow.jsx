'use strict'
import React from 'react'
import Dropdown from '../Mixin/Form/Dropdown.jsx'

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
        url: './properties/Manager/' + this.props.id,
        dataType: 'json',
        type: 'delete'
      }).done(function (data) {
        if (data.success === true) {
          this.props.remove()
        }
      }.bind(this))
    }
  }

  activate() {
    $.ajax({
      url: './properties/Manager/' + this.props.id,
      type: 'patch',
      data: {
        varname: 'active',
        value: true,
      }
    }).done(function () {
      this.props.message(this.props.company_name + ' activated')
      this.props.reload()
    }.bind(this))
  }

  deactivate() {
    $.ajax({
      url: './properties/Manager/' + this.props.id,
      type: 'patch',
      data: {
        varname: 'active',
        value: false,
      }
    }).done(function () {
      this.props.message(this.props.company_name + ' deactivated')
      this.props.reload()
    }.bind(this))
  }

  render() {
    let alabel = null
    let aicon = null
    let ahandle = null

    if (this.props.active === '1') {
      alabel = 'Deactivate'
      aicon = <i
        className="text-danger fa fa-lg fa-times-circle"
        role="button"
        title="Click to deactivate"></i>
      ahandle = this.deactivate
    } else {
      alabel = 'Activate'
      aicon = <i
        className="text-success fa fa-lg fa-check-circle"
        role="button"
        title="Click to activate"></i>
      ahandle = this.activate
    }

    let optionList = null
    if (this.props.admin) {
      const options = [
        {
          label: 'Edit',
          icon: <i className="fa fa-pencil-square-o"></i>,
          handleClick: this.props.fillForm
        }, {
          label: 'Add property',
          icon: <i className="fa fa-building-o"></i>,
          link: './properties/Property/create/?managerId=' + this.props.id
        }, {
          label: alabel,
          icon: aicon,
          handleClick: ahandle
        }, {
          label: 'Delete',
          icon: <i className="fa fa-trash"></i>,
          handleClick: this.delete
        }
      ]
      optionList = <Dropdown options={options} label="Options"/>
    }

    let properties = <div>
      <em>None</em>
    </div>
    if (this.props.property_count > 0) {
      properties = <a
        href={`./properties/Property/?managerId=${this.props.id}`}
        className="btn btn-default">View Properties</a>
    }

    let co = null
    if (this.props.first_name.length > 0) {
      co = <small>(c/o {this.props.first_name}&nbsp;{this.props.last_name})</small>
    }
    const email = 'mailto:' + this.props.email_address
    const viewLink = `./properties/Manager/${this.props.id}/view`
    return (
      <tr className={this.props.active === '0'
        ? 'bg-danger'
        : ''}>
        <td>
          <span className="company-name"><a href={viewLink}>{this.props.company_name}</a></span><br/>{co}
        </td>
        <td>
          {properties}
        </td>
        <td>
          <LinkToButton url={this.props.phone_tel} icon="fa-phone" label={this.props.phone}/>
          <Website url={this.props.company_url}/>
          <LinkToButton
            url={email}
            icon="fa-envelope-o"
            label={this.props.email_address}/>
        </td>
        {this.props.admin === true
          ? <td>{optionList}</td>
          : null}
      </tr>
    )
  }
}

ManagerRow.defaultProps = {
  phone: '',
  phone_tel: '',
  email_address: '',
  last_log: null,
  company_url: '',
  first_name: '',
  last_name: '',
  admin: false
}

ManagerRow.propTypes = {
  property_count: React.PropTypes.string,
  email_address: React.PropTypes.string,
  company_name: React.PropTypes.string,
  showProperties: React.PropTypes.func,
  company_url: React.PropTypes.string,
  first_name: React.PropTypes.string,
  last_name: React.PropTypes.string,
  phone_tel: React.PropTypes.string,
  last_log: React.PropTypes.string,
  fillForm: React.PropTypes.func,
  active: React.PropTypes.string,
  message: React.PropTypes.func,
  phone: React.PropTypes.string,
  remove: React.PropTypes.func,
  reload: React.PropTypes.func,
  admin: React.PropTypes.bool,
  id: React.PropTypes.string
}

class Website extends React.Component {
  render() {
    if (this.props.url.length > 0) {
      return (<LinkToButton url={this.props.url} label={this.props.url} icon="fa-link"/>)
    } else {
      return null
    }
  }
}

Website.propTypes = {
  url: React.PropTypes.string
}

class LinkToButton extends React.Component {
  render() {
    const bigIconClass = 'fa fa-2x ' + this.props.icon
    const smallIconClass = 'fa ' + this.props.icon
    return (
      <span>
        <a
          href={this.props.url}
          target="_blank"
          className="link-button visible-xs-inline-block btn btn-primary">
          <i className={bigIconClass}></i>
        </a>
        <a
          href={this.props.url}
          className="visible-sm visible-md visible-lg"
          target="_blank">
          <i className={smallIconClass}></i>&nbsp;{this.props.label}
        </a>
      </span>
    )
  }
}
LinkToButton.propTypes = {
  url: React.PropTypes.string,
  icon: React.PropTypes.string,
  label: React.PropTypes.string
}

export default ManagerRow
