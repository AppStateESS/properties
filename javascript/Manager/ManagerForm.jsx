'use strict'
import React from 'react'
import InputField from '../Mixin/Form/InputField.jsx'
import Modal from '../Mixin/Html/Modal.jsx'
import CheckValues from '../Mixin/Helper/CheckValues'

/* global $ */

class ManagerForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      phone: '',
      email_address: '',
      company_name: '',
      company_address: '',
      company_url: '',
      times_available: '',
      usernameError: null,
      passwordError: null,
      firstNameError: null,
      lastNameError: null,
      phoneError: null,
      emailError: null,
      companyNameError: null
    }

    let bindable = [
      'addTestData',
      'checkCompanyName',
      'checkEmailAddress',
      'checkEmailDuplicate',
      'checkPassword',
      'checkPhone',
      'checkUsername',
      'checkUsernameDuplicate',
      'resetForm',
      'save',
      'setCompanyName',
      'setCompanyAddress',
      'setCompanyUrl',
      'setEmailAddress',
      'setFirstName',
      'setLastName',
      'setPassword',
      'setPhone',
      'setTimesAvailable',
      'setUsername'
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
    this.setState({
      id: manager.id,
      username: manager.username,
      password: manager.password,
      first_name: manager.first_name,
      last_name: manager.last_name,
      phone: manager.phone,
      email_address: manager.email_address,
      company_name: manager.company_name,
      company_address: manager.company_address,
      company_url: manager.company_url,
      times_available: manager.times_available,
      usernameError: null,
      passwordError: null,
      firstNameError: null,
      lastNameError: null,
      phoneError: null,
      emailError: null,
      companyNameError: null
    })
  }

  componentWillUpdate(props) {
    const manager = props.manager
    if (manager.id !== undefined && manager.id !== this.state.id) {
      this.setState({
        id: manager.id,
        username: manager.username,
        password: '',
        first_name: manager.first_name,
        last_name: manager.last_name,
        phone: manager.phone,
        email_address: manager.email_address,
        company_name: manager.company_name,
        company_address: manager.company_address,
        company_url: manager.company_url,
        times_available: manager.times_available,
        usernameError: null,
        passwordError: null,
        firstNameError: null,
        lastNameError: null,
        phoneError: null,
        emailError: null,
        companyNameError: null
      })
    }
  }

  resetForm() {
    this.setState({
      id: '0',
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      phone: '',
      email_address: '',
      company_name: '',
      company_address: '',
      company_url: '',
      times_available: '',
      usernameError: null,
      passwordError: null,
      firstNameError: null,
      lastNameError: null,
      phoneError: null,
      emailError: null,
      companyNameError: null
    })
    $('#reactModal').modal('hide')
  }

  copyUsername(username) {
    if (CheckValues.isEmail(username) && CheckValues.isEmpty(this.state.email_address)) {
      this.setState({email_address: username})
    }
  }

  setUsername(e) {
    this.setState({username: e.target.value})
  }

  setPassword(e) {
    this.setState({password: e.target.value})
  }

  setFirstName(e) {
    this.setState({first_name: e.target.value})
  }

  setLastName(e) {
    this.setState({last_name: e.target.value})
  }

  setPhone(e) {
    this.setState({phone: e.target.value})
  }

  setEmailAddress(e) {
    this.setState({email_address: e.target.value})
  }

  setCompanyName(e) {
    this.setState({company_name: e.target.value})
  }

  setCompanyAddress(e) {
    this.setState({company_address: e.target.value})
  }

  setCompanyUrl(e) {
    this.setState({company_url: e.target.value})
  }

  setTimesAvailable(e) {
    this.setState({times_available: e.target.value})
  }

  postErrors(errors) {
    if (errors.companyEmpty) {
      this.setState({companyNameError: 'Please enter a company name'})
    } else if(errors.companyDuplicate) {
      this.setState({companyNameError: 'Company name already in use'})
    }

    if (errors.emailEmpty) {
      this.setState({emailError: 'Email may not be empty'})
    }

    if (errors.firstNameEmpty) {
      this.setState({firstNameError: 'First name may not be empty'})
    }

    if (errors.lastNameEmpty) {
      this.setState({lastNameError: 'Last name may not be empty'})
    }

    if (errors.passwordEmpty) {
      this.setState({passwordError: 'Password may not be empty'})
    } else if (errors.passwordShort) {
      this.setState({passwordError: 'Password must be a least 8 characters'})
    }

    if (errors.phoneEmpty) {
      this.setState({phoneError: 'Phone number may not be empty'})
    } else if (errors.phoneBadFormat) {
      this.setState({phoneError: 'Phone number is improperly formatted'})
    }

    if (errors.usernameEmpty) {
      this.setState({usernameError: 'Username may not be empty'})
    } else if (errors.usernameDuplicate) {
      this.setState({usernameError: 'Username already in use'})
    }
  }

  save() {
    $.post('properties/Manager/', {
      id: this.state.id,
      username: this.state.username,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      phone: this.state.phone,
      email_address: this.state.email_address,
      company_name: this.state.company_name,
      company_address: this.state.company_address,
      company_url: this.state.company_url,
      times_available: this.state.times_available
    }, null, 'json').done(function (data) {
      if (data.status === 'error') {
        this.postErrors(data)
      } else {
        this.resetForm()
        this.props.reload()
      }
    }.bind(this)).fail(function () {})
  }

  checkPhone() {
    if (!CheckValues.isPhone(this.state.phone)) {
      this.setState({phoneError: 'Phone number not formatted properly'})
    } else {
      this.setState({phoneError: null})
    }
  }

  checkUsername() {
    if (this.state.username.match(/\s/)) {
      this.setState({usernameError: 'No spaces are allowed'})
    } else {
      this.checkUsernameDuplicate(function () {
        this.copyUsername(this.state.username)
      }.bind(this))
    }
  }

  checkUsernameDuplicate(callback) {
    $.getJSON('properties/Manager/checkUsername', {
      username: this.state.username,
      id: this.state.id
    }).done(function (data) {
      if (data.duplicate) {
        this.setState({usernameError: 'Username already in use'})
      } else {
        this.setState({usernameError: null})
        if (callback !== undefined) {
          callback()
        }
      }
    }.bind(this))
  }

  checkEmailAddress() {
    if (!CheckValues.isEmail(this.state.email_address)) {
      this.setState({emailError: 'Email not formatted properly'})
    } else {
      this.checkEmailDuplicate()
    }
  }

  checkEmailDuplicate(callback) {
    $.getJSON('properties/Manager/checkEmail', {
      email_address: this.state.email_address,
      id: this.state.id
    }).done(function (data) {
      if (data.duplicate) {
        this.setState({emailError: 'Email address already in use'})
      } else {
        this.setState({emailError: null})
      }
      if (callback !== undefined) {
        callback()
      }
    }.bind(this))
  }

  checkPassword() {
    if (this.state.password.length < 8) {
      this.setState({passwordError: 'Password must be 8 characters or more'})
    } else {
      this.setState({passwordError: null})
    }
  }

  checkCompanyName() {
    if (CheckValues.isEmpty(this.state.company_name)) {
      if (this.state.first_name.length > 0 && this.state.last_name.length > 0) {
        this.setState({
          company_name: this.state.first_name + ' ' + this.state.last_name,
          companyNameEmptyError: false
        })
      }
    } else {
      this.checkCompanyDuplicate(function () {
        this.setState({companyNameError: null})
      }.bind(this))
    }
  }

  checkCompanyDuplicate(callback) {
    $.getJSON('properties/Manager/checkCompanyName', {
      company_name: this.state.company_name,
      'id': this.state.id
    }).done(function (data) {
      if (data.duplicate) {
        this.setState({companyNameError: 'Company Name already in use'})
      } else {
        this.setState({companyNameError: null})
        if (callback !== undefined) {
          callback()
        }
      }
    }.bind(this))
  }

  addTestData() {
    this.setState({
      username: 'tommy',
      password: 'password',
      first_name: 'Tommy',
      last_name: 'Tutone',
      phone: '828-123-1233',
      email_address: 'Tom@aol.com',
      company_name: 'Tommy Place',
      company_address: '123 Elm Street',
      company_url: 'http://google.com',
      times_available: '8am to 5pm'
    })
  }

  render() {
    let testButton = <button className="btn btn-warning" onClick={this.addTestData}>Test</button>

    let button = <button className="btn btn-success" onClick={this.save}>
      <i className="fa fa-floppy-o"></i>&nbsp;Save</button>

    let footer = <span>{button}&nbsp;{testButton}&nbsp;</span>

    let managerForm = (
      <div className="managerForm">
        <form>
          <div className="row">
            <div className="col-sm-6">
              <InputField
                name="username"
                label="Username"
                value={this.state.username}
                change={this.setUsername}
                required={true}
                blur={this.checkUsername}
                errorMessage={this.state.usernameError}/>
            </div>
            <div className="col-sm-6">
              <InputField
                type="password"
                name="password"
                iid="managerPassword"
                label="Password"
                blur={this.checkPassword}
                value={this.state.password}
                change={this.setPassword}
                errorMessage={this.state.passwordError}
                required={true}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <InputField
                name="first_name"
                iid="managerFirstName"
                label="First name"
                value={this.state.first_name}
                change={this.setFirstName}
                errorMessage={this.state.firstNameError}
                required={true}/>
            </div>
            <div className="col-sm-6">
              <InputField
                name="last_name"
                iid="managerLastName"
                label="Last name"
                value={this.state.last_name}
                change={this.setLastName}
                errorMessage={this.state.lastNameError}
                required={true}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <InputField
                name="phone"
                iid="managerPhone"
                label="Phone"
                value={this.state.phone}
                change={this.setPhone}
                errorMessage={this.state.phoneError}
                blur={this.checkPhone}
                required={true}/>
            </div>
            <div className="col-sm-6">
              <InputField
                name="email_address"
                iid="managerEmailAddress"
                label="Email"
                value={this.state.email_address}
                change={this.setEmailAddress}
                blur={this.checkEmailAddress}
                errorMessage={this.state.emailError}
                required={true}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <InputField
                name="company_name"
                iid="managerCompanyName"
                label="Company name"
                value={this.state.company_name}
                change={this.setCompanyName}
                errorMessage={this.state.companyNameError}
                required={true}
                blur={this.checkCompanyName}/>
              <InputField
                name="company_address"
                iid="managerCompanyAddress"
                label="Company address"
                value={this.state.company_address}
                change={this.setCompanyAddress}/>
              <InputField
                name="company_url"
                iid="managerCompanyUrl"
                label="Company URL"
                value={this.state.company_url}
                change={this.setCompanyUrl}/>
              <label htmlFor="m-times-available">Times available</label>
              <textarea
                id="m-times-available"
                className="form-control"
                name="times_available"
                value={this.state.times_available}
                onChange={this.setTimesAvailable}/>
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
  reload: React.PropTypes.func,
  manager: React.PropTypes.object
}

export default ManagerForm
