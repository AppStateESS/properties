'use strict'
import React from 'react'
import InputField from '../Mixin/InputField.jsx'
import empty from '../Mixin/Empty.js'
import DecodeUrl from '../Mixin/DecodeUrl.js'

export default class ManagerSignin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.updateUsername = this.updateUsername.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.submit = this.submit.bind(this)
    this.url = new DecodeUrl
  }

  updateUsername(e) {
    this.setState({username: e.target.value})
  }

  updatePassword(e) {
    this.setState({password: e.target.value})
  }

  submit(e) {
    if (this.state.username.length === 0 || this.state.password.length === 0) {
      e.preventDefault()
    }
  }

  checkError() {
    if (this.url.values.error === undefined) {
      return
    }
    switch (this.url.values.error) {
      case 'not_found':
        return (
          <div className="alert alert-warning">Could not log-in account.&nbsp;
            <a href="./properties/ManagerContact/forgot">Did you forget your password?</a>
          </div>
        )
    }
  }

  render() {
    const disabled = empty(this.state.username) || empty(this.state.password)
    return (
      <div>
        <h2>Manager log-in</h2>
        {this.checkError()}
        <form action="./properties/ManagerContact/signin" method="post">
          <div className="row">
            <div className="col-sm-6">
              <InputField
                name="manager_username"
                label="Username"
                value={this.state.username}
                change={this.updateUsername}
                autocomplete={false}
                required={true}/>
            </div>
            <div className="col-sm-6">
              <InputField
                name="manager_password"
                type="password"
                label="Password"
                value={this.state.password}
                change={this.updatePassword}
                autocomplete={false}
                required={true}/>
            </div>
          </div>
          <button className="btn btn-primary" disabled={disabled} onClick={this.submit}>Log in</button>
        </form>
        <p className="marginTop">
          <a href="./properties/ManagerContact/forgot">Forgot password?</a>
        </p>
        <p>
          <a href="./properties/ManagerSignup">Request a manager account.</a>
        </p>
      </div>
    )
  }
}

ManagerSignin.propTypes = {}
