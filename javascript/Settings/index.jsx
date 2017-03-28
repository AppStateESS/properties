'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import InputField from '../Mixin/Form/InputField.jsx'
import CheckValues from '../Mixin/Helper/CheckValues.js'
import bindMethods from '../Mixin/Helper/Bind.js'
import Message from '../Mixin/Html/Message.jsx'

/* global $ */

export default class Settings extends React.Component {
  constructor() {
    super()
    this.state = {
      message: null,
      settings: {
        site_email: '',
        approval_email: ''
      },
      errors: {
        site_email: false,
        approval_email: false
      }
    }
    bindMethods([
      'setValue',
      'setError',
      'checkValues',
      'save',
      'clearMessage',
      'checkSiteEmail',
      'checkApprovalEmail'
    ], this)
  }

  componentDidMount() {
    this.load()
  }

  setValue(varname, value) {
    if (typeof value === 'object' && value.target !== undefined) {
      value = value.target.value
    }
    this.setError(varname, null)
    let settings = this.state.settings
    settings[varname] = value
    this.setState({settings: settings})
  }

  setError(varname, value) {
    let errors = this.state.errors
    errors[varname] = value
    this.setState({errors})
  }

  checkSiteEmail() {
    if (!CheckValues.isEmail(this.state.settings.site_email)) {
      this.setError('site_email', true)
      return false
    } else {
      this.setError('site_email', false)
      return true
    }
  }

  checkApprovalEmail() {
    if (!CheckValues.isEmail(this.state.settings.approval_email)) {
      this.setError('approval_email', true)
      return false
    } else {
      this.setError('approval_email', false)
      return true
    }
  }

  checkValues() {
    let allClear = true
    if (!this.checkSiteEmail()) {
      allClear = false
    }
    if (!this.checkApprovalEmail()) {
      allClear = false
    }
    return allClear
  }

  save() {
    if (this.checkValues()) {
      $.post('./properties/Settings/', this.state.settings, null, 'json').done(function (data) {
        if (data.success) {
          this.setState({message: 'Settings saved'})
        }
      }.bind(this)).fail(function () {
        this.setState({message: 'Server error prevented saving'})
      })
    }
  }

  errorFree() {
    const {errors, settings} = this.state
    return errors.site_email === false && errors.approval_email === false && settings.site_email !== '' && settings.approval_email !== ''
  }

  load() {
    $.getJSON('./properties/Settings/view').done(function (data) {
      this.setState({settings: data})
    }.bind(this))
  }

  clearMessage() {
    this.setState({message:null})
  }

  render() {
    let message
    if (this.state.message !== null) {
      message = <Message message={this.state.message} onClose={this.clearMessage}/>
    }
    return (
      <div>
        {message}
        <form>
          <div className="form-group">
            <InputField
              label="Site email"
              name="site_email"
              value={this.state.settings.site_email}
              placeholder="This is the from/reply-to address from this site."
              change={this.setValue.bind(this, 'site_email')}
              errorMessage={this.state.errors.site_email
              ? 'Check your email address formatting'
              : null}
              blur={this.checkSiteEmail}/>
          </div>
          <div className="form-group">
            <InputField
              label="Approval email"
              name="site_email"
              value={this.state.settings.approval_email}
              placeholder="This email address will receive new manager notifications."
              change={this.setValue.bind(this, 'approval_email')}
              errorMessage={this.state.errors.approval_email
              ? 'Check your email address formatting'
              : null}
              blur={this.checkApprovalEmail}/>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!this.errorFree()}
            onClick={this.save}>Save settings</button>
        </form>
      </div>
    )
  }
}

Settings.propTypes = {}

ReactDOM.render(
  <Settings/>, document.getElementById('settings'))
