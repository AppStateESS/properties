'use strict'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import bindMethod from '../Mixin/Helper/Bind.js'
import Message from '../Mixin/Html/Message.jsx'

/* global $, managerId */

export default class ManagerPasswordChange extends Component {
  constructor() {
    super()
    this.state = {
      password: '',
      passwordCheck: '',
      passwordError: null,
      currentPassword: '',
      currentPasswordCheck: '',
      currentPasswordError: null,
      message: null,
      complete: false
    }
    bindMethod([
      'updatePassword',
      'updatePasswordCheck',
      'updateCurrentPassword',
      'checkCurrentPassword',
      'checkPassword',
      'disabled',
      'save'
    ], this)
  }

  save() {
    let {password, currentPassword} = this.state

    $.ajax({
      url: './properties/Manager/changePassword',
      data: {
        currentPassword: currentPassword,
        password: password
      },
      dataType: 'json',
      type: 'patch',
      success: function (data) {
        if (data.success === false) {
          this.setState({message: data.error})
        } else {
          this.setState({complete : true})
        }
      }.bind(this)
    })
  }

  updatePassword(e) {
    const password = e.target.value
    this.setState({password: password})
  }

  updatePasswordCheck(e) {
    const password = e.target.value
    this.setState({passwordCheck: password})
  }

  updateCurrentPassword(e) {
    const password = e.target.value
    this.setState({currentPassword: password})
  }

  updateCurrentPasswordCheck(e) {
    const password = e.target.value
    this.setState({currentPasswordCheck: password})
  }

  passwordError() {
    if (this.state.passwordError) {
      return <span className="label label-danger">{this.state.passwordError}</span>
    }
  }

  currentPasswordError() {
    if (this.state.currentPasswordError) {
      return <span className="label label-danger">{this.state.currentPasswordError}</span>
    }
  }

  disabled() {
    return this.state.password.length < 8 || this.state.password !== this.state.passwordCheck || this.state.currentPassword == 0
  }

  checkPassword() {
    let errorMessage
    if (this.state.password.length < 8) {
      errorMessage = 'Password must be at least eight characters in length'
    } else if (this.state.password !== this.state.passwordCheck) {
      errorMessage = 'Password must match'
    }
    this.setState({passwordError: errorMessage})
  }

  checkCurrentPassword() {
    let errorMessage
    if (this.state.currentPassword.length == 0) {
      errorMessage = 'Current password must not be empty'
    }
    this.setState({currentPasswordError: errorMessage})
  }

  render() {
    if (this.state.complete) {
      return <div><h2>Password change complete</h2><p>You may continue working or log out.</p></div>
    }
    let message
    if (this.state.message) {
      message = <Message type="danger" message={this.state.message}/>
    }
    return (
      <div>
        <h2>Password change</h2>
        {message}
        <p>This form will change your sign-in password.</p>
        <form>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="currentPassword">Current password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={this.state.currentPassword}
                  className="form-control"
                  onBlur={this.checkCurrentPassword}
                  onChange={this.updateCurrentPassword}/> {this.currentPasswordError()}
              </div>
              <div className="form-group">
                <label htmlFor="password">New password</label>
                <input
                  type="password"
                  name="password1"
                  value={this.state.password}
                  className="form-control"
                  onBlur={this.checkPassword}
                  placeholder="Eight characters or longer"
                  onChange={this.updatePassword}/> {this.passwordError()}
              </div>
              <div className="form-group">
                <label htmlFor="password2">Verify password</label>
                <input
                  type="password"
                  name="password2"
                  className="form-control"
                  value={this.state.passwordCheck}
                  onBlur={this.checkPassword}
                  onChange={this.updatePasswordCheck}/>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            disabled={this.disabled()}
            onClick={this.save}>Update password</button>
        </form>
      </div>
    )
  }
}
ReactDOM.render(
  <ManagerPasswordChange/>, document.getElementById('managerpasswordchange'))
