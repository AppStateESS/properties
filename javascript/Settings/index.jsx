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
        our_email: '',
        approval_email: '',
        our_name: '',
        our_phone: ''
      },
      errors: {
        our_email: false,
        approval_email: false,
        our_phone: false
      }
    }
    bindMethods([
      'setValue',
      'setError',
      'checkValues',
      'save',
      'clearMessage',
      'checkSiteEmail',
      'checkApprovalEmail',
      'checkPhone'
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

  checkPhone() {
    if (this.state.settings.our_phone.length > 0 && !CheckValues.isPhone(this.state.settings.our_phone)) {
      this.setError('our_phone', true)
      return false
    } else {
      this.setError('our_phone', false)
      return true
    }
  }

  checkSiteEmail() {
    if (!CheckValues.isEmail(this.state.settings.our_email)) {
      this.setError('our_email', true)
      return false
    } else {
      this.setError('our_email', false)
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
    if (!this.checkPhone()) {
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
    return errors.our_email === false && errors.approval_email === false && settings.our_email !== '' && settings.approval_email !== '' && errors.our_phone === false
  }

  load() {
    $.getJSON('./properties/Settings/view').done(function (data) {
      this.setState({settings: data})
    }.bind(this))
  }

  clearMessage() {
    this.setState({message: null})
  }

  render() {
    let message
    if (this.state.message !== null) {
      message = <Message message={this.state.message} onClose={this.clearMessage}/>
    }
    return (
      <div>
        <h2>Administrative Settings</h2>
        {message}
        <form>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <InputField
                  label="Approval email"
                  name="approval_email"
                  value={this.state.settings.approval_email}
                  placeholder="This email address will receive new manager notifications."
                  required={true}
                  change={this.setValue.bind(this, 'approval_email')}
                  errorMessage={this.state.errors.approval_email
                  ? 'Email address must be complete and in the correct format'
                  : null}
                  blur={this.checkApprovalEmail}/>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <InputField
                  label="Site email"
                  name="our_email"
                  value={this.state.settings.our_email}
                  required={true}
                  placeholder="This is the from/reply-to address from this site."
                  change={this.setValue.bind(this, 'our_email')}
                  errorMessage={this.state.errors.our_email
                  ? 'Email address must be complete and in the correct format'
                  : null}
                  blur={this.checkSiteEmail}/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <InputField
                  label="Contact name"
                  name="our_name"
                  value={this.state.settings.our_name}
                  placeholder="The contact name on outgoing email."
                  change={this.setValue.bind(this, 'our_name')}/>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <InputField
                  label="Contact phone"
                  name="our_phone"
                  value={this.state.settings.our_phone}
                  placeholder="The contact phone number on outgoing email."
                  change={this.setValue.bind(this, 'our_phone')}
                  errorMessage={this.state.errors.our_phone
                  ? 'Check your phone number formatting (10 digits)'
                  : null}
                  blur={this.checkPhone}/>
              </div>
            </div>
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
