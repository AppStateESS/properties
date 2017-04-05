'use strict'
import React from 'react'
import InputField from '../Mixin/Form/InputField.jsx'
import bindMethods from '../Mixin/Helper/Bind.js'
import empty from '../Mixin/Helper/Empty.js'
import Message from '../Mixin/Html/Message.jsx'
import CheckValues from '../Mixin/Helper/CheckValues.js'

/* global $ */

export default class ManagerSignin extends React.Component {
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
        company_name: null
      }
    }
    bindMethods([
      'submit',
      'resetMessage',
      'updateUsername',
      'checkUsernameAjax',
      'checkEmailAjax',
      'checkCompanyName',
      'checkPassword',
      'checkEmail',
      'checkPhone',
      'post'
    ], this)
  }

  updateState(varname, event) {
    this.setError(varname, '')
    let value = typeof event === 'object'
      ? event.target.value
      : event
    this.empty[varname] = empty(value)
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
      $.getJSON('./properties/Manager/checkUsername', {username: this.state.username}).done(function (data) {
        this.setError('username', data.duplicate
          ? 'Please use try a different username'
          : null)
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
      $.getJSON('./properties/Manager/checkEmail', {email_address: this.state.email_address}).done(function (data) {
        this.setError('email_address', data.duplicate
          ? 'Email address already in use'
          : null)
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
      $.getJSON('./properties/Manager/checkCompanyName', {company_name: this.state.company_name}).done(function (data) {
        this.setError('company_name', data.duplicate
          ? 'Company name already in use'
          : null)
        if (callback !== null) {
          callback()
        }
      }.bind(this))
    }
  }

  checkPassword() {
    const status = this.state.password.length >= 8
    this.setError('password', status
      ? null
      : 'Password must be 8 characters or more')
    return status
  }

  checkPhone() {
    const status = CheckValues.isPhone(this.state.phone)
    this.setError('phone', status
      ? null
      : 'Phone number must be 10 digits')
    return status
  }

  checkEmail() {
    if (!empty(this.state.email_address) && this.checkEmailStructure()) {
      this.checkEmailAjax()
    }
  }

  checkEmailStructure() {
    const status = CheckValues.isEmail(this.state.email_address)
    this.setError('email_address', status
      ? null
      : 'Email poorly formatted')
    return status
  }

  urlWrap(input) {
    return (
      <div className="input-group">
        <span className="input-group-addon">http://</span>
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
        this.setError(vname, `${vname.charAt(0).toUpperCase()}${vname.replace(/_/, ' ').substr(1)} may not be empty`)
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
        this.setState({company_name: `${this.state.first_name} ${this.state.last_name}`, message: 'Company name is required. Using your first and last name.'})
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
    let values = this.state
    delete values.message
    delete values.errors

    $.ajax({
      method: 'POST',
      url: './properties/Manager/apply',
      dataType: 'json',
      data: values,
      success: function (data) {
        if (data.status) {
          window.location.href = './properties/Manager/success'
        }
      }.bind(this),
      failure: function () {
        this.setState({message: 'Error: there was a problem with your application. Please contact us.'})
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
      <div>
        {message}
        <h2>Sign up for Manager Account</h2>
        <p>
          Manager accounts are for people who rent property to tenants only.
        </p>
        <p>
          If you need to sublease your current residence, head over to our&nbsp;
          <a href="./properties/Sublease">sublease page.</a>
        </p>
        <h3>Contact information</h3>
        <div className="row">
          <div className="col-sm-6">
            <InputField
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
              required={true}
              change={this.updateState.bind(this, 'first_name')}
              errorMessage={this.state.errors.first_name}
              onEmpty={this.setEmpty.bind(this, 'first_name')}
              value={this.state.first_name}
              label="First name"/>
          </div>
          <div className="col-sm-6">
            <InputField
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
              wrap={this.urlWrap}
              change={this.updateState.bind(this, 'company_url')}
              value={this.state.company_url}
              label="Company url"/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <InputField
              change={this.updateState.bind(this, 'company_address')}
              value={this.state.company_address}
              label="Company address"/>
          </div>
        </div>
        <button type="button" className="btn btn-success" onClick={this.submit}>Submit request</button>
      </div>
    )
  }
}
ManagerSignin.propTypes = {}
