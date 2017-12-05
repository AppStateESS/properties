'use strict'
import React from 'react'
import empty from '../Mixin/Helper/Empty.js'
import Waiting from '../Mixin/Html/Waiting.jsx'
import InputField from '../Mixin/Form/InputField.jsx'
import ButtonGroup from '../Mixin/Form/ButtonGroup.jsx'
import Rooms from '../Mixin/Form/Rooms.jsx'
import bindMethods from '../Mixin/Helper/Bind.js'
import DatePicker from 'react-date-picker'
import Range from '../Mixin/Helper/Range.js'
import Base from '../Mixin/Edit/Base.jsx'
import BigCheckbox from '../Mixin/Form/BigCheckbox.jsx'
import Message from '../Mixin/Html/Message.jsx'
import SubmitForm from '../Mixin/Form/SubmitForm.jsx'
import CheckValues from '../Mixin/Helper/CheckValues.js'
import moment from 'moment'
import Help from '../Mixin/Html/Help.jsx'
import UtilityFunctions from '../Mixin/Edit/UtilityFunctions.js'
import './style.css'

/* global $, subleaseCurrent */

export default class SubleaseForm extends Base {
  constructor(props) {
    super(props)
    this.state = {
      sublease: null,
      errors: {},
      message: null,
      saving: false
    }
    const methods = [
      'activate',
      'deactivate',
      'setValue',
      'setIntegerValue',
      'checkForm',
      'checkPhone',
      'checkEmail',
      'updateRent',
      'setMoveIn',
      'setMoveOut',
      'updateParking',
      'sendActive'
    ]
    bindMethods(methods, this)
  }

  componentDidMount() {
    this.setState({sublease: subleaseCurrent})
  }

  setMessage(text, type) {
    const message = {
      text: text,
      type: type
    }
    this.setState({message: message})
    this.scrollUp()
  }

  unsetMessage() {
    this.setState({message: null})
  }

  checkForm(e) {
    e.preventDefault()
    const sublease = this.state.sublease
    let errors = this.state.errors
    let errorFound = false
    if (sublease.name.length === 0) {
      errors.name = true
      errorFound = true
    } else {
      errors.name = false
    }

    if (sublease.address.length === 0) {
      errors.address = true
      errorFound = true
    } else {
      errors.address = false
    }

    if (empty(sublease.monthly_rent)) {
      errors.monthly_rent = true
      errorFound = true
    } else {
      errors.monthly_rent = false
    }

    if (empty(sublease.contact_phone)) {
      errors.contact_phone = true
      errorFound = true
    } else {
      errors.contact_phone = false
    }

    if (empty(sublease.contact_email)) {
      errors.contact_email = true
      errorFound = true
    } else {
      errors.contact_email = false
    }

    if (empty(sublease.landlord_perm)) {
      errors.landlord_perm = true
      errorFound = true
    } else {
      errors.landlord_perm = false
    }

    if (!this.checkMoveOutDate(sublease.move_out_date, sublease.move_in_date)) {
      errorFound = true
    }

    if (errorFound) {
      this.setMessage('Check below for errors before saving', 'danger')
      this.setState({errors: errors, activeTab: 0})
      this.scrollUp()
    } else {
      this.save()
    }
  }

  checkPhone() {
    this.setError('contact_phone', !CheckValues.isPhone(this.state.sublease.contact_phone))
  }

  checkEmail() {
    this.setError('contact_email', !CheckValues.isEmail(this.state.sublease.contact_email))
  }

  save() {
    let sublease = this.state.sublease
    let methodName = 'POST'
    this.setState({saving: true})
    let url = './properties/Sublease'
    if (sublease.id > 0) {
      methodName = 'PUT'
      url = url + '/' + this.state.sublease.id
    }
    $.ajax({
      url: url,
      data: sublease,
      dataType: 'json',
      method: methodName,
      success: function (data) {
        if (data.error !== undefined) {
          this.setMessage(data.error, 'danger')
          this.setState({saving: false})
        } else {
          window.location.href = './properties/Sublease/' + data.id
        }
      }.bind(this),
      error: function () {
        this.setMessage('A server error prevented this sublease from saving.', 'danger')
      }.bind(this)
    })
  }

  scrollUp() {
    this.refs.PageTop.scrollIntoView()
  }

  setValue(varname, value) {
    if (typeof value === 'object' && value.target !== undefined) {
      value = value.target.value
    }
    let sublease = this.state.sublease
    sublease[varname] = value
    this.setState({sublease})
  }

  setError(varname, value) {
    let errors = this.state.errors
    errors[varname] = value
    this.setState({errors})
  }

  setIntegerValue(varname, value) {
    if (typeof value === 'object' && value.target !== undefined) {
      value = value.target.value
    } else if (typeof value === 'boolean') {
      value = value
        ? 1
        : 0
    }
    value = parseInt(value)
    this.setValue(varname, value)
  }

  setMoveIn(a) {
    const date = new Date(a).getTime()/1000
    this.setValue('move_in_date', date)
  }

  checkMoveOutDate(out_date, in_date)
  {
    if (out_date < moment().unix() || out_date <= in_date) {
      this.setError('move_out_date', true)
      return false
    } else {
      this.setError('move_out_date', false)
      return true
    }
  }

  setMoveOut(a) {
    const date = new Date(a).getTime()/1000
    this.setValue('move_out_date', date)
  }

  updateParking(parking) {
    if (typeof parking === 'object') {
      parking = Number(parking.target.value)
    } else {
      parking = Number(parking)
    }
    if (parking >= 1 && parking <= 6) {
      this.setValue('parking_per_unit', parking)
    }
  }

  getLeaseType() {
    return [
      {
        value: '0',
        label: <span>
            <i className="fa fa-user"></i>&nbsp; Tenant</span>
      }, {
        value: '1',
        label: <span>
            <i className="fa fa-building"></i>&nbsp; Unit</span>
      }
    ]
  }

  updateRent(e) {
    const rent = e.target.value.replace(/[^\d]/g, '')
    this.setError('monthly_rent', empty(rent))
    this.setValue('monthly_rent', rent)
  }

  activate() {
    this.sendActive('1')
  }

  deactivate() {
    this.sendActive('0')
  }

  sendActive(value)
  {
    $.ajax({
      url: './properties/Sublease/' + this.state.sublease.id,
      data: {
        varname: 'active',
        value: value
      },
      dataType: 'json',
      type: 'patch',
      success: function () {
        this.setValue('active', value)
      }.bind(this)
    })
  }

  render() {
    if (this.state.sublease === null) {
      return <Waiting message="Checking for previous sublease..."/>
    }
    const {sublease} = this.state
    let parking = Range(sublease.parking_per_unit)
    let message
    if (this.state.message !== null) {
      message = <Message
        message={this.state.message.text}
        type={this.state.message.type}
        onClose={this.unsetMessage}/>
    }

    let activateButton
    if (sublease.id > 0) {
      if (empty(sublease.active)) {
        activateButton = (
          <div onClick={this.activate} className="lead pointer text-muted">
            <i className="fa fa-toggle-off"></i>&nbsp; Sublease inactive</div>
        )
      } else {
        activateButton = (
          <div onClick={this.deactivate} className="lead pointer text-success">
            <i className="fa fa-toggle-on"></i>&nbsp; Sublease active</div>
        )
      }
    }

    let contactAlert
    if (this.state.sublease.id === 0) {
      contactAlert = (
        <div className="alert alert-info">
          <strong>Notice:</strong>&nbsp;
          a sublease listing requires contact information.<br/>Use our
          <a href="./properties/Roommate">roommate section</a>
          if you want to keep your contact information available only to other students.</div>
      )
    }

    let landlordWarning
    if (this.state.errors.landlord_perm === true) {
      landlordWarning = <div className="alert alert-danger">
        <i className="fa fa-exclamation-triangle"></i>&nbsp;You should not sublease without notifying your landlord</div>
    }

    let moveOutError
    if (this.state.errors.move_out_date) {
      moveOutError = <span className="label label-danger">Move out date must be after move in date and the current date.</span>
    }
    return (
      <div ref="PageTop" className="sublease-form">
        <h2>{sublease.id > 0
            ? 'Update '
            : 'Create '}
          my sublease</h2>
        {message}
        {contactAlert}
        <div className="text-align marginBottom">
          {activateButton}
        </div>
        <div className="row">
          <div className="col-sm-6">
            <InputField
              name="name"
              label="Title"
              value={sublease.name}
              errorMessage={this.state.errors.name
              ? 'Title may not be empty'
              : null}
              change={this.setValue.bind(this, 'name')}
              required={true}/>
          </div>
          <div className="col-sm-6">
            <InputField
              name="address"
              label="Address"
              type="text"
              placeholder="Street, City, State, Zip code"
              errorMessage={this.state.errors.address
              ? 'Address may not be empty'
              : null}
              value={sublease.address}
              change={this.setValue.bind(this, 'address')}
              required={true}/> {(sublease.address.length > 10)
              ? <small>
                  <a href={this.googleize(sublease.address)} target="_blank">View on Google Maps</a>&nbsp;<Help
                    title="If Google Maps can't find the location, you may want to refine the address"/>
                </small>
              : null}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label>Description</label>
            <textarea
              className="form-control"
              placeholder="Description is not searchable. Be sure to use other settings as well."
              name="description"
              value={sublease.description}
              onChange={this.setValue.bind(this, 'description')}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <InputField
              name="contact_phone"
              label="Contact phone number"
              value={sublease.contact_phone}
              errorMessage={this.state.errors.contact_phone
              ? 'Phone number must be 10 digits'
              : null}
              change={this.setValue.bind(this, 'contact_phone')}
              placeholder="###-###-####"
              blur={this.checkPhone}
              required={true}/>
          </div>
          <div className="col-sm-6">
            <InputField
              name="contact_email"
              label="Contact email address"
              errorMessage={this.state.errors.contact_email
              ? 'Check your email address formatting'
              : null}
              value={sublease.contact_email}
              change={this.setValue.bind(this, 'contact_email')}
              blur={this.checkEmail}
              required={true}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <div style={{
              maxWidth: '200px'
            }}>
              <label>Monthly rent</label>
              <i className="fa fa-asterisk text-danger"></i>&nbsp;
              <Help
                title="Enter the total amount the subleaser will pay per month, not the rent for the whole unit"/>
              <InputField
                ref="monthlyRent"
                name="monthly_rent"
                type="type"
                wrap={this.dollarize}
                errorMessage={this.state.errors.monthly_rent
                ? 'Rent amount may not be empty'
                : null}
                value={sublease.monthly_rent}
                change={this.updateRent}
                required={true}/>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <label>Subleasing tenant or unit</label><Help title="Are you subleasing a tenant's portion or the entire unit?"/><br/>
            <ButtonGroup
              name="lease_type"
              buttons={this.getLeaseType()}
              match={sublease.lease_type}
              handle={this.setValue.bind(this, 'lease_type')}
              activeColor="success"/>
          </div>
          <div className="col-sm-12 col-md-4">
            <label>Additional fees</label>
            <textarea
              className="form-control"
              placeholder="List any required subleaser fees or deposits"
              name="additional_fees"
              value={sublease.additional_fees}
              onChange={this.setValue.bind(this, 'additional_fees')}/>
          </div>
        </div>
        <Rooms property={sublease} setValue={this.setValue} bg={true}/>
        <div className="row">
          <div className="col-sm-6">
            <label>Move-in date</label><br/>
            <DatePicker
              onChange={this.setMoveIn}
              value={this.formatDate(sublease.move_in_date)}/>
          </div>
          <div className="col-sm-6">
            <label>Sublease end date</label><br/>
            <DatePicker
              onChange={this.setMoveOut}
              value={this.formatDate(sublease.move_out_date)}/> {moveOutError}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="pull-left">
              <label>Parking spaces per unit</label>
              <input
                name="parking_per_unit"
                type="text"
                size="2"
                onChange={this.updateParking}
                onClick={this.select}
                value={sublease.parking_per_unit}
                className="single-input"/>
            </div>
            <ButtonGroup
              buttons={parking}
              match={sublease.parking_per_unit}
              handle={this.updateParking}
              activeColor="success"/>
          </div>
          <div className="col-sm-6">
            <label>Miles from campus</label>
            <ButtonGroup
              name="campus_distance"
              buttons={this.campusDistance()}
              match={sublease.campus_distance}
              handle={this.setValue.bind(this, 'campus_distance')}
              activeColor="success"/>
            <BigCheckbox
              handle={this.setIntegerValue.bind(this, 'appalcart')}
              checked={!empty(sublease.appalcart)}
              label="On AppalCart route"/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label>Property type</label><br/>
            <ButtonGroup
              name="proptype"
              buttons={this.propertyType()}
              match={sublease.proptype}
              handle={this.setValue.bind(this, 'proptype')}
              activeColor="success"/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <div>
              <BigCheckbox
                handle={this.setIntegerValue.bind(this, 'no_smoking')}
                checked={sublease.no_smoking}
                label="Smoke free"/>
              &nbsp;
              <Help
                title="Regardless of landlord's allowance, the other tenant's wishes should be respected."/>
            </div>
            <div>
              <BigCheckbox
                handle={this.setIntegerValue.bind(this, 'pets_allowed')}
                checked={sublease.pets_allowed}
                label="Pets allowed"/>&nbsp;
              <Help title="You may put pet details in the description"/>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div>
              <BigCheckbox
                handle={this.setIntegerValue.bind(this, 'dishwasher')}
                checked={sublease.dishwasher}
                label="Dishwasher"/>
            </div>
            <div>
              <BigCheckbox
                handle={this.setIntegerValue.bind(this, 'furnished')}
                checked={sublease.furnished}
                label="Furnished"/>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div>
              <BigCheckbox
                handle={this.setIntegerValue.bind(this, 'utilities_inc')}
                checked={sublease.utilities_inc}
                label="Utilities included"/>&nbsp;<Help title="Check this box if the unit's utilities are included in the rent."/>
            </div>
            <div>
              <BigCheckbox
                handle={this.setIntegerValue.bind(this, 'airconditioning')}
                checked={sublease.airconditioning}
                label="Airconditioning"/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <label>Internet</label><br/>
            <ButtonGroup
              name="internet_type"
              buttons={UtilityFunctions.internetTypes()}
              match={sublease.internet_type}
              handle={this.setIntegerValue.bind(this, 'internet_type')}
              activeColor="success"/>
          </div>
          <div className="col-sm-6">
            <label>Television</label><br/>
            <ButtonGroup
              name="tv_type"
              buttons={UtilityFunctions.televisionTypes()}
              match={sublease.tv_type}
              handle={this.setIntegerValue.bind(this, 'tv_type')}
              activeColor="success"/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label>Laundry</label><br/>
            <ButtonGroup
              name="laundry_type"
              buttons={UtilityFunctions.laundryTypes()}
              match={sublease.laundry_type}
              handle={this.setIntegerValue.bind(this, 'laundry_type')}
              activeColor="success"/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label>Trash and Recycling</label><br/>
            <ButtonGroup
              name="trash_type"
              buttons={UtilityFunctions.trashTypes()}
              match={sublease.trash_type}
              handle={this.setIntegerValue.bind(this, 'trash_type')}
              activeColor="success"/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <BigCheckbox
              checked={sublease.landlord_perm}
              handle={this.setIntegerValue.bind(this, 'landlord_perm')}
              label="My landlord is aware I am subleasing"/> {landlordWarning}
          </div>
        </div>
        <SubmitForm check={this.checkForm} saving={this.state.saving} label="Sublease"/>
      </div>
    )
  }
}
