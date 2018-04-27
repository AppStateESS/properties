'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Dropdown from '../Mixin/Form/Dropdown.jsx'

/* global $ */

class ManagerRow extends Component {
  constructor(props) {
    super(props)
    this.delete = this.delete.bind(this)
    this.activate = this.activate.bind(this)
    this.deactivate = this.deactivate.bind(this)
  }

  delete() {
    if (prompt(
      "Deleting this manager will remove their account and all their properties.\nTyp" +
      "e 'DELETE' to confirm"
    ) === 'DELETE') {
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
        value: true
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
        value: false
      }
    }).done(function () {
      this.props.message(this.props.company_name + ' deactivated')
      this.props.reload()
    }.bind(this))
  }

  render() {
    let optionList = null
    if (this.props.admin) {
      const options = [
        {
          label: 'Edit',
          icon: <i className="fas fa-edit"></i>,
          handleClick: this.props.fillForm
        }, {
          label: 'Add property',
          icon: <i className="far fa-building"></i>,
          link: './properties/Property/create/?managerId=' + this.props.id
        }, {
          label: 'Activate',
          icon: (
            <i
              className="text-success fa fa-check-circle"
              role="button"
              title="Click to enable"></i>
          ),
          handleClick: this.activate,
          hidden: this.props.active === '1',
        }, {
          label: 'Disable',
          icon: <i
            className="text-danger fa fa-times-circle"
            role="button"
            title="Click to disable"></i>,
          handleClick: this.deactivate,
          hidden: this.props.active === '0',
        }, {
          label: 'Delete',
          icon: <i className="far fa-trash-alt"></i>,
          handleClick: this.delete
        },
      ]
      optionList = <Dropdown
        options={options}
        label="Options"
        color={this.props.active === '0'
          ? 'light'
          : null}/>
    }

    let buttonClass = 'btn btn-outline-dark'
    if (this.props.active === '0') {
      buttonClass = 'btn btn-light'
    }

    let properties = (
      <div>
        <button className={buttonClass} disabled={true}>No properties found</button>
      </div>
    )
    const propertyCount = this.props.property_count
    if (propertyCount > 0) {
      const label = propertyCount > 1
        ? `View ${this.props.property_count} properties`
        : 'View property'
      properties = (
        <a
          href={`./properties/Property/?managerId=${this.props.id}`}
          className={buttonClass}>
          <i className="far fa-building"></i>&nbsp;{label}</a>
      )
    }

    let co = null
    if (this.props.first_name.length > 0) {
      co = <small>(c/o {this.props.first_name}&nbsp;{this.props.last_name})</small>
    }
    const email = 'mailto:' + this.props.email_address
    const viewLink = `./properties/Manager/${this.props.id}/view`
    return (
      <div
        className={this.props.active === '0'
          ? 'bg-danger row managerRow '
          : 'row managerRow '}>
        <div className="col-sm-8">
          <h4 className="company-name">
            <a href={viewLink}>{this.props.company_name}</a>
          </h4>{co}
          <div>
            <LinkToButton
              url={this.props.phone_tel}
              icon="fa-phone"
              label={this.props.phone}/>
            <Website url={this.props.company_url}/>
            <LinkToButton url={email} icon="fa-envelope" label={this.props.email_address}/> {
              this.props.admin === true
                ? optionList
                : null
            }
          </div>
        </div>
        <div className="col-sm-4">
          {properties}
        </div>
      </div>
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
  property_count: PropTypes.string,
  email_address: PropTypes.string,
  company_name: PropTypes.string,
  showProperties: PropTypes.func,
  company_url: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  phone_tel: PropTypes.string,
  last_log: PropTypes.string,
  fillForm: PropTypes.func,
  active: PropTypes.string,
  message: PropTypes.func,
  phone: PropTypes.string,
  remove: PropTypes.func,
  reload: PropTypes.func,
  admin: PropTypes.bool,
  id: PropTypes.string
}

const Website = (props) => {
  if (props.url.length > 0) {
    return (<LinkToButton url={props.url} label={props.url} icon="fa-link"/>)
  } else {
    return null
  }
}

Website.propTypes = {
  url: PropTypes.string
}

const LinkToButton = (props) => {
  const bigIconClass = 'fas fa-lg ' + props.icon
  const smallIconClass = 'fas ' + props.icon
  return (
    <span>
      <a
        href={props.url}
        target="_blank"
        className="link-button d-block d-sm-none btn btn-outline-dark mb-1">
        <i className={bigIconClass}></i>
      </a>
      <a href={props.url} className="d-none d-sm-block" target="_blank">
        <i className={smallIconClass}></i>&nbsp;{props.label}
      </a>
    </span>
  )
}

LinkToButton.propTypes = {
  url: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string
}

export default ManagerRow
