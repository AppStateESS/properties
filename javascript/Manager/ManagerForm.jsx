'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputField from '../Mixin/Form/InputField.jsx'
import Modal from '../Mixin/Html/Modal.jsx'
import CheckValues from '../Mixin/Helper/CheckValues'
import ManagerObject from '../Mixin/Objects/ManagerObject.js'

/* global $ */

class ManagerForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      manager: ManagerObject,
      errors: {
        username: null,
        password: null,
        first_name: null,
        last_name: null,
        phone: null,
        email: null,
        company_name: null
      }
    }

    let bindable = [
      'checkCompanyName',
      'checkEmailAddress',
      'checkEmailDuplicate',
      'checkPassword',
      'checkPhone',
      'checkUsername',
      'checkUsernameDuplicate',
      'resetForm',
      'save',
      'setValue',
      'setError'
    ]

    bindable.map(function (v) {
      this[v] = this[v].bind(this)
    }.bind(this))
  }

  componentDidMount() {
    const manager = this.props.manager
    if (manager.length === 0) {
      return
    }
    this.setState({manager: manager})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.manager.id !== this.state.manager.id) {
      this.setState({manager: nextProps.manager})
    }
  }

  setValue(varname, value) {
    if (typeof value === 'object' && value.target !== undefined) {
      value = value.target.value
    }
    this.setError(varname, null)
    let manager = this.state.manager
    manager[varname] = value
    this.setState({manager})
  }

  setError(varname, value) {
    let errors = this.state.errors
    errors[varname] = value
    this.setState({errors})
  }

  resetForm() {
    this.setState({
      manager: ManagerObject,
      errors: {
        username: null,
        password: null,
        first_name: null,
        last_name: null,
        phone: null,
        email: null,
        company_name: null
      }
    })
    $('#reactModal').modal('hide')
  }

  copyUsername(username) {
    if (CheckValues.isEmail(username) && CheckValues.isEmpty(this.state.manager.email_address)) {
      this.setValue('email_address', username)
    }
  }

  postErrors(errors) {
    if (errors.companyEmpty) {
      this.setError('company_name', 'Please enter a company name')
    } else if (errors.companyDuplicate) {
      this.setError('company_name', 'Company name already in use')
    } else {
      this.setError('company_name', null)
    }

    if (errors.emailEmpty) {
      this.setError('email', 'Email may not be empty')
    } else {
      this.setError('email', null)
    }

    if (errors.firstNameEmpty) {
      this.setError('first_name', 'First name may not be empty')
    } else {
      this.setError('first_name', null)
    }

    if (errors.lastNameEmpty) {
      this.setError('last_name', 'Last name may not be empty')
    } else {
      this.setError('last_name', null)
    }

    if (errors.passwordEmpty) {
      this.setError('password', 'Password may not be empty')
    } else if (errors.passwordShort) {
      this.setError('password', 'Password must be a least 8 characters')
    } else {
      this.setError('password', null)
    }

    if (errors.phoneEmpty) {
      this.setError('phone', 'Phone number may not be empty')
    } else if (errors.phoneBadFormat) {
      this.setError('phone', 'Phone number is improperly formatted')
    } else {
      this.setError('phone', null)
    }

    if (errors.usernameEmpty) {
      this.setError('username', 'Username may not be empty')
    } else if (errors.usernameDuplicate) {
      this.setError('username', 'Username already in use')
    } else {
      this.setError('username', null)
    }
  }

  save() {
    $.post('properties/Manager/', this.state.manager, null, 'json').done(function (data) {
      if (data.status === 'error') {
        this.postErrors(data)
      } else {
        this.resetForm()
        this.props.reload()
      }
    }.bind(this)).fail(function () {})
  }

  checkPhone() {
    if (!CheckValues.isPhone(this.state.manager.phone)) {
      this.setError('phone', 'Phone number not formatted properly')
    } else {
      this.setError('phone', null)
    }
  }

  checkUsername() {
    if (this.state.manager.username && this.state.manager.username.match(/\s/)) {
      this.setError('username', 'No spaces are allowed')
    } else {
      this.checkUsernameDuplicate(function () {
        this.copyUsername(this.state.manager.username)
      }.bind(this))
    }
  }

  checkUsernameDuplicate(callback) {
    if (!this.state.manager.username) {
      return
    }
    $.getJSON('properties/Manager/checkUsername', {
      username: this.state.manager.username,
      id: this.state.manager.id
    }).done(function (data) {
      if (data.duplicate) {
        this.setState({username: 'Username already in use'})
      } else {
        this.setState({username: null})
        if (callback !== undefined) {
          callback()
        }
      }
    }.bind(this))
  }

  checkEmailAddress() {
    if (!CheckValues.isEmail(this.state.manager.email_address)) {
      this.setError('email', 'Email not formatted properly')
    } else {
      this.checkEmailDuplicate()
    }
  }

  checkEmailDuplicate(callback) {
    $.getJSON('properties/Manager/checkEmail', {
      email_address: this.state.manager.email_address,
      id: this.state.manager.id
    }).done(function (data) {
      if (data.duplicate) {
        this.setError('email', 'Email address already in use')
      } else {
        this.setError('email', null)
      }
      if (callback !== undefined) {
        callback()
      }
    }.bind(this))
  }

  checkPassword() {
    if (this.state.manager.password && this.state.manager.password.length < 8) {
      this.setError('password', 'Password must be 8 characters or more')
    } else {
      this.setError('password', null)
    }
  }

  checkCompanyName() {
    if (CheckValues.isEmpty(this.state.manager.company_name)) {
      if (this.state.manager.first_name.length > 0 && this.state.manager.last_name.length > 0) {
        this.setValue('company_name', this.state.manager.first_name + ' ' + this.state.manager.last_name)
        this.setError('company_name', 'Company name was empty. Using full name. Change or save to continue.')
      }
    } else {
      this.checkCompanyDuplicate(function () {
        this.setError('company_name', null)
      }.bind(this))
    }
  }

  checkCompanyDuplicate(callback) {
    $.getJSON('properties/Manager/checkCompanyName', {
      company_name: this.state.manager.company_name,
      'id': this.state.manager.id
    }).done(function (data) {
      if (data.duplicate) {
        this.setError('company_name', 'Company Name already in use')
      } else {
        this.setError('company_name', null)
        if (callback !== undefined) {
          callback()
        }
      }
    }.bind(this))
  }

  render() {
    let button = <button className="btn btn-success" onClick={this.save}>
      <i className="fa fa-floppy-o"></i>&nbsp;Save</button>

    let footer = <span>{button}&nbsp;</span>
    const manager = this.state.manager
    const errors = this.state.errors

    let managerForm = (
      <div className="managerForm">
        <form>
          <div className="row">
            <div className="col-sm-6">
              <InputField
                name="username"
                label="Username"
                value={manager.username}
                change={this.setValue.bind(this, 'username')}
                required={true}
                blur={this.checkUsername}
                errorMessage={errors.username}/>
            </div>
            <div className="col-sm-6">
              <InputField
                type="password"
                name="password"
                iid="managerPassword"
                label="Password"
                blur={this.checkPassword}
                value={manager.password}
                change={this.setValue.bind(this, 'password')}
                errorMessage={errors.password}
                required={true}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <InputField
                name="first_name"
                iid="managerFirstName"
                label="First name"
                value={manager.first_name}
                change={this.setValue.bind(this, 'first_name')}
                errorMessage={errors.first_name}
                required={true}/>
            </div>
            <div className="col-sm-6">
              <InputField
                name="last_name"
                iid="managerLastName"
                label="Last name"
                value={manager.last_name}
                change={this.setValue.bind(this, 'last_name')}
                errorMessage={errors.last_name}
                required={true}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <InputField
                name="phone"
                iid="managerPhone"
                label="Phone"
                value={manager.phone}
                change={this.setValue.bind(this, 'phone')}
                errorMessage={errors.phone}
                blur={this.checkPhone}
                required={true}/>
            </div>
            <div className="col-sm-6">
              <InputField
                name="email_address"
                iid="managerEmailAddress"
                label="Email"
                value={manager.email_address}
                change={this.setValue.bind(this, 'email_address')}
                blur={this.checkEmailAddress}
                errorMessage={errors.email}
                required={true}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <InputField
                name="company_name"
                iid="managerCompanyName"
                label="Company name"
                value={manager.company_name}
                change={this.setValue.bind(this, 'company_name')}
                errorMessage={errors.company_name}
                required={true}
                blur={this.checkCompanyName}/>
              <InputField
                name="company_address"
                iid="managerCompanyAddress"
                label="Company address"
                value={manager.company_address}
                change={this.setValue.bind(this, 'company_address')}/>
              <InputField
                name="company_url"
                iid="managerCompanyUrl"
                label="Company URL"
                value={manager.company_url}
                change={this.setValue.bind(this, 'company_url')}/>
              <label htmlFor="m-times-available">Times available</label>
              <textarea
                id="m-times-available"
                className="form-control"
                name="times_available"
                value={manager.times_available}
                onChange={this.setValue.bind(this, 'times_available')}/>
            </div>
          </div>
        </form>
      </div>
    )

    return <Modal
      body={managerForm}
      header="Create manager"
      footer={footer}
      onClose={this.resetForm}/>
  }
}

ManagerForm.propTypes = {
  reload: PropTypes.func,
  manager: PropTypes.object
}

export default ManagerForm
