'use strict'
import React, {Component} from 'react'
import InputField from '@essappstate/canopy-react-inputfield'
import bindMethods from '../Mixin/Helper/Bind.js'
import empty from '../Mixin/Helper/Empty.js'
import Message from '../Mixin/Html/Message.jsx'
import CheckValues from '../Mixin/Helper/CheckValues.js'

/* global $ */

export default class ManagerSignup extends Component {
  constructor(props) {
    super(props)

    this.empty = {
      username: true,
      password: true,
      phone: true,
      email_address: true,
      first_name: true,
      last_name: true,
      company_name: true
    }

    this.state = {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email_address: '',
      phone: '',
      company_name: '',
      company_url: '',
      company_address: '',
      message: '',
      errors: {
        username: null,
        password: null,
        phone: null,
        email_address: null,
        first_name: null,
        last_name: null,
        company_name: null,
        company_url: null
      }
    }
    bindMethods([
      'submit',
      'resetMessage',
      'updateUsername',
      'checkAllDuplicates',
      'checkUsernameAjax',
      'checkEmailAjax',
      'checkCompanyName',
      'checkPassword',
      'checkEmail',
      'checkPhone',
      'checkUrl',
      'post'
    ], this)
  }

  updateState(varname, event) {
    this.setError(varname, '')
    let value = typeof event === 'object'
      ? event.target.value
      : event
    if (typeof this.empty[varname] !== 'undefined') {
      this.empty[varname] = empty(value)
    }
    this.setState({[varname]: value})
  }

  updateUsername(event) {
    const value = event.target.value
    if (value.length === 0 || value.search(/^[\w@\-\+\.]+$/g) >= 0) {
      this.updateState('username', value.toLowerCase())
    }
  }

  setEmpty(varname) {
    this.empty[varname] = true
  }

  setError(varname, value) {
    let errors = this.state.errors
    errors[varname] = value
    this.setState({errors: errors})
  }

  checkUsernameAjax(callback = null) {
    if (empty(this.state.username)) {
      if (callback !== null) {
        callback()
      }
    } else {
      $.getJSON(
        './properties/Manager/checkUsername',
        {username: this.state.username}
      ).done(function (data) {
        this.setError(
          'username',
          data.duplicate
            ? 'Please use try a different username'
            : null
        )
        if (callback !== null) {
          callback()
        }
      }.bind(this))
    }
  }

  checkEmailAjax(callback = null) {
    if (empty(this.state.email_address)) {
      if (callback !== null) {
        callback()
      }
    } else {
      $.getJSON(
        './properties/Manager/checkEmail',
        {email_address: this.state.email_address}
      ).done(function (data) {
        this.setError(
          'email_address',
          data.duplicate
            ? 'Email address already in use'
            : null
        )
        if (callback !== null) {
          callback()
        }
      }.bind(this))
    }
  }

  checkCompanyName(callback = null) {
    if (empty(this.state.company_name)) {
      if (callback !== null) {
        callback()
      }
    } else {
      $.getJSON(
        './properties/Manager/checkCompanyName',
        {company_name: this.state.company_name}
      ).done(function (data) {
        this.setError(
          'company_name',
          data.duplicate
            ? 'Company name already in use'
            : null
        )
        if (callback !== null) {
          callback()
        }
      }.bind(this))
    }
  }

  checkPassword() {
    const status = this.state.password.length >= 8
    this.setError(
      'password',
      status
        ? null
        : 'Password must be 8 characters or more'
    )
    return status
  }

  checkPhone() {
    const status = CheckValues.isPhone(this.state.phone)
    this.setError(
      'phone',
      status
        ? null
        : 'Phone number must be 10 digits'
    )
    return status
  }

  checkUrl() {
    if (this.state.company_url.length === 0) {
      return true
    }
    const status = CheckValues.isUrl(this.state.company_url)
    this.setError(
      'company_url',
      status
        ? null
        : 'URL is not formatted properly.'
    )
    return status
  }

  checkEmail() {
    if (!empty(this.state.email_address) && this.checkEmailStructure()) {
      this.checkEmailAjax()
    }
  }

  checkEmailStructure() {
    const status = CheckValues.isEmail(this.state.email_address)
    this.setError(
      'email_address',
      status
        ? null
        : 'Email poorly formatted'
    )
    return status
  }

  urlWrap(input) {
    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">http://</span>
        </div>
        {input}
      </div>
    )
  }

  resetMessage() {
    this.setState({message: ''})
  }

  presubmitTest() {
    this.resetMessage()
    let allowSubmit = true
    let empty = false

    for (let vname in this.empty) {
      if (this.empty[vname] === true) {
        this.setError(
          vname,
          `${vname.charAt(0).toUpperCase()}${vname.replace(/_/, ' ').substr(1)} may not be empty`
        )
        empty = true
      }
      if (empty === true) {
        allowSubmit = false
        this.setState({message: 'Please complete all required fields'})
      }
    }

    if (!this.checkPassword()) {
      allowSubmit = false
    }

    if (!this.checkPhone()) {
      allowSubmit = false
    }

    if (!this.checkUrl()) {
      allowSubmit = false
    }

    if (!this.empty.email_address) {
      if (!this.checkEmailStructure()) {
        allowSubmit = false
      }
    }

    for (let prop in this.state.errors) {
      if (this.state.errors[prop] === true) {
        this.setState({message: 'There are errors in your submission'})
        allowSubmit = false
        break
      }
    }

    if (this.empty.company_name) {
      if (!this.empty.first_name && !this.empty.last_name) {
        this.setState(
          {company_name: `${this.state.first_name} ${this.state.last_name}`, message: 'Company name is required. Using your first and last name.'}
        )
        this.empty.company_name = false
        this.setError('company_name', '')
      } else {
        this.setState({message: 'Please complete all required fields'})
      }
      allowSubmit = false
    }

    return allowSubmit
  }

  checkAllDuplicates(callback) {
    const usernameCallback = this.checkUsernameAjax.bind(this, callback)
    const emailCallback = this.checkEmailAjax.bind(this, usernameCallback)
    this.checkCompanyName(emailCallback)
  }

  submit() {
    const allowSubmit = this.presubmitTest()
    if (allowSubmit) {
      this.checkAllDuplicates(this.post)
    } else {
      this.checkAllDuplicates()
    }
  }

  post() {
    let values = Object.assign({}, this.state)
    delete values.message
    delete values.errors
    $.ajax({
      method: 'post',
      url: './properties/Manager/apply',
      dataType: 'json',
      data: values,
      success: (data) => {
        if (data.status === 'success') {
          location.href = 'properties/Manager/success'
        } else {
          this.setState(
            {message: 'Error: there was a problem with your application. Please contact us.'}
          )
        }
      },
      error: () => {
        this.setState(
          {message: 'Error: there was a problem with your application. Please contact us.'}
        )
      }
    })
  }

  render() {
    let message
    if (!empty(this.state.message)) {
      message = <Message
        message={this.state.message}
        type="danger"
        onClose={this.resetMessage}/>
    }
    return (
      <div className="row">
        <div className="col-sm-10 col-md-9 mx-auto">
          <div className="card">
            <div className="card-header">
              <h2 className="m-0">Sign up for Property Manager Account</h2>
            </div>
            <div className="card-body">
              {message}
              <p className="card-text">
                Property manager accounts are for property owners and rental companies only.
              </p>
              <p className="card-text">
                If you are a tenant who needs to sublease your current rental unit, head over to
                our&nbsp;
                <a href="./properties/Sublease">sublease page.</a>
              </p>
              <h3>Contact information</h3>
              <div className="row">
                <div className="col-sm-6">
                  <InputField
                    name="username"
                    label="Username"
                    required={true}
                    change={this.updateUsername}
                    errorMessage={this.state.errors.username}
                    blur={this.checkUsernameAjax}
                    onEmpty={this.setEmpty.bind(this, 'username')}
                    value={this.state.username}/>
                </div>
                <div className="col-sm-6">
                  <InputField
                    name="password"
                    type="Password"
                    required={true}
                    change={this.updateState.bind(this, 'password')}
                    errorMessage={this.state.errors.password}
                    blur={this.checkPassword}
                    placeholder="8 character minimum"
                    value={this.state.password}
                    onEmpty={this.setEmpty.bind(this, 'password')}
                    label="Password"/>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <InputField
                    name="first_name"
                    required={true}
                    change={this.updateState.bind(this, 'first_name')}
                    errorMessage={this.state.errors.first_name}
                    onEmpty={this.setEmpty.bind(this, 'first_name')}
                    value={this.state.first_name}
                    label="First name"/>
                </div>
                <div className="col-sm-6">
                  <InputField
                    name="last_name"
                    required={true}
                    change={this.updateState.bind(this, 'last_name')}
                    errorMessage={this.state.errors.last_name}
                    onEmpty={this.setEmpty.bind(this, 'last_name')}
                    value={this.state.last_name}
                    label="Last name"/>
                </div>
              </div>
              <h3>Company Information</h3>
              <div className="row">
                <div className="col-sm-6">
                  <InputField
                    name="email_address"
                    required={true}
                    change={this.updateState.bind(this, 'email_address')}
                    blur={this.checkEmail}
                    errorMessage={this.state.errors.email_address}
                    onEmpty={this.setEmpty.bind(this, 'email_address')}
                    value={this.state.email_address}
                    label="Email address"/>
                </div>
                <div className="col-sm-6">
                  <InputField
                    name="phone"
                    required={true}
                    blur={this.checkPhone}
                    placeholder="xxx-xxx-xxxx"
                    change={this.updateState.bind(this, 'phone')}
                    onEmpty={this.setEmpty.bind(this, 'phone')}
                    errorMessage={this.state.errors.phone}
                    value={this.state.phone}
                    label="Phone number"/>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <InputField
                    name="company_name"
                    required={true}
                    blur={this.checkCompanyName}
                    change={this.updateState.bind(this, 'company_name')}
                    value={this.state.company_name}
                    errorMessage={this.state.errors.company_name}
                    onEmpty={this.setEmpty.bind(this, 'company_name')}
                    label="Company name"/>
                </div>
                <div className="col-sm-6">
                  <InputField
                    name="company_url"
                    wrap={this.urlWrap}
                    blur={this.checkUrl}
                    required={false}
                    errorMessage={this.state.errors.company_url}
                    change={this.updateState.bind(this, 'company_url')}
                    value={this.state.company_url}
                    label="Company url"/>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <InputField
                    name="company_address"
                    change={this.updateState.bind(this, 'company_address')}
                    value={this.state.company_address}
                    label="Company address"/>
                </div>
              </div>
              <div className="text-center"><button type="button" className="btn btn-success" onClick={this.submit}>Submit request</button></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
