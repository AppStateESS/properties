'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputField from 'canopy-react-inputfield'
import empty from '../Mixin/Helper/Empty.js'
import DecodeUrl from '../Mixin/Helper/DecodeUrl.js'

export default class ManagerSignin extends Component {
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

  componentDidMount() {
    if (this.url.values.username) {
      this.setState({username: this.url.values.username})
    }
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
          <div className="alert alert-warning">
            <p>Could not log-in account.</p>
            <ul>
              <li>Is your caps lock on?</li>
              <li>Has your account been approved?</li>
              <li>
                <a href="./properties/Manager/signup">Have you applied for an account yet?
                  <i className="fas fa-link"></i>
                </a>
              </li>
              <li>
                <a href="./properties/Manager/forgot">Did you forget your password?
                  <i className="fas fa-link"></i>
                </a>
              </li>
            </ul>
          </div>
        )
    }
  }

  render() {
    const disabled = empty(this.state.username) || empty(this.state.password)
    return (
      <div>
        <h2>Manager sign in</h2>
        {this.checkError()}
        <form action="./properties/Manager/signin" method="post">
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
        <div className="well mt-2 lead">
          <a href="./properties/Manager/forgot">Forgot password?</a><br/>
          <a href="./properties/Manager/signup">Request a manager account.</a>
        </div>
      </div>
    )
  }
}

ManagerSignin.propTypes = {}
