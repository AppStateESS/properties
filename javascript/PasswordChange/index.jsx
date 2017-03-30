'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import bindMethod from '../Mixin/Helper/Bind.js'
import Message from '../Mixin/Html/Message.jsx'

/* global $, hash */

class PasswordChange extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      passwordCheck: '',
      username: '',
      passwordError: null,
      usernameError: null,
      message: null
    }
    bindMethod([
      'updateUsername',
      'updatePassword',
      'updatePasswordCheck',
      'checkPassword',
      'checkUsername',
      'disabled',
      'save'
    ], this)
  }

  save() {
    let {password, username} = this.state
    $.post('./properties/Manager/changepw', {
      password: password,
      username: username,
      hash: hash
    }, null, 'json').done(function (data) {
      if (data.success === false) {
        this.setState({message: data.error})
      } else {
        window.location.href = './properties/Manager/passwordChangeComplete'
      }
    }.bind(this)).fail(function () {
      this.setState({message: 'There was an error during your password update.'})
    })
  }

  updateUsername(e) {
    const username = e.target.value
    this.setState({username: username})
  }

  updatePassword(e) {
    const password = e.target.value
    this.setState({password: password})
  }

  updatePasswordCheck(e) {
    const password = e.target.value
    this.setState({passwordCheck: password})
  }

  passwordError() {
    if (this.state.passwordError) {
      return <span className="label label-danger">{this.state.passwordError}</span>
    }
  }

  usernameError() {
    if (this.state.usernameError) {
      return <span className="label label-danger">{this.state.usernameError}</span>
    }
  }

  disabled() {
    return this.state.password.length < 8 || this.state.password !== this.state.passwordCheck
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

  checkUsername() {
    let errorMessage
    if (this.state.username.length === 0) {
      errorMessage = 'Username may not be empty'
    }
    this.setState({usernameError: errorMessage})
  }

  render() {
    let message
    if (this.state.message) {
      message = <Message type="danger" message={this.state.message}/>
    }
    return (
      <div>
        <h2>Password change</h2>
        {message}
        <p>This form will change your sign in password. Enter your current user name and
          new password.</p>
        <form>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={this.state.username}
                  className="form-control"
                  onBlur={this.checkUsername}
                  onChange={this.updateUsername}/>{this.usernameError()}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="password">New password</label>
                <input
                  id="password"
                  type="password"
                  name="password1"
                  value={this.state.password}
                  className="form-control"
                  onBlur={this.checkPassword}
                  onChange={this.updatePassword}/> {this.passwordError()}
              </div>
              <div className="form-group">
                <label htmlFor="password2">Verify password</label>
                <input
                  id="password2"
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
  <PasswordChange/>, document.getElementById('passwordchange'))
