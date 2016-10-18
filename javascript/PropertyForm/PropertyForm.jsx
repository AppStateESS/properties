'use strict'
import React from 'react'
import moment from 'moment'

import bindMethods from '../Mixin/Bind.js'
import {DateField} from 'react-date-picker'
import DecodeUrl from '../Mixin/DecodeUrl.js'
import PropertyObject from '../Mixin/PropertyObject.js'
import InputField from '../Mixin/InputField.jsx'
import ErrorPage from '../Mixin/ErrorPage.jsx'
import ButtonGroup from '../Mixin/ButtonGroup.jsx'
import BooleanButton from '../Mixin/BooleanButton.jsx'
import Range from '../Mixin/Range.js'
import Dollarize from '../Mixin/Dollarize.jsx'

import Pets from './Pets.jsx'
import Fees from './Fees.jsx'
import Rooms from './Rooms.jsx'
import Features from './Features.jsx'
import Utilities from './Utilities.jsx'
import UtilityImbursement from './UtilityImbursement.jsx'

import 'react-date-picker/index.css'

/* global $ */

export default class PropertyForm extends React.Component {
  constructor() {
    super()
    const url = new DecodeUrl
    this.managerId = url.values['managerId']
    this.state = {
      property: PropertyObject,
      manager: {},
      petForm: PropertyObject.pets_allowed,
      errors: {
        name: false,
        address: false,
        monthly_rent: false
      }
    }
    const methods = [
      'half',
      'setValue',
      'setIntegerValue',
      'setMoveIn',
      'updateParking',
      'updateRent',
      'checkForm'
    ]
    bindMethods(methods, this)
  }

  checkForm(e) {
    e.preventDefault()

    const property = this.state.property
    let errors = this.state.errors
    let errorFound = false
    if (property.name.length === 0) {
      errors.name = true
      errorFound = true
    } else {
      errors.name = false
    }

    if (property.address.length === 0) {
      errors.address = true
      errorFound = true
    } else {
      errors.address = false
    }

    if (property.monthly_rent.length === 0) {
      errors.monthly_rent = true
      errorFound = true
    } else {
      errors.monthly_rent = false
    }

    if (errorFound) {
      this.setState({errors: errors})
      this.refs.PropertyForm.scrollIntoView()
    } else {
      this.refs.PropertyForm.submit()
    }
  }

  studentType() {
    let types = [
      {
        value: 0,
        label: 'No preference'
      }, {
        value: 1,
        label: 'Undergraduate'
      }, {
        value: 2,
        label: 'Graduate'
      }
    ]
    return types
  }

  campusDistance() {
    return [
      {
        value: 0,
        label: '0 to 5'
      }, {
        value: 5,
        label: '5 to 10'
      }, {
        value: 10,
        label: '10 to 25'
      }, {
        value: 25,
        label: 'More than 25'
      }
    ]
  }

  componentDidMount() {
    $.getJSON('./properties/Manager/' + this.managerId, {}).done(function (data) {
      this.setState({manager: data})
    }.bind(this))
  }

  setValue(varname, value) {
    if (typeof value === 'object' && value.target !== undefined) {
      value = value.target.value
    }
    let property = this.state.property
    property[varname] = value
    this.setState({property})
  }

  setIntegerValue(varname, value) {
    this.setValue(varname, parseInt(value))
  }

  setMoveIn(a) {
    this.setValue('move_in_date', a)
  }

  getMoveInDate() {
    if (this.state.property.move_in_date === 0) {
      return moment().format('YYYY-MM-DD')
    } else {
      return moment(this.state.property.move_in_date * 1000).format('YYYY-MM-DD')
    }
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
        value: 0,
        label: <span>
            <i className="fa fa-user"></i>&nbsp; Per unit</span>
      }, {
        value: 1,
        label: <span>
            <i className="fa fa-users"></i>&nbsp; Per tenant</span>
      }
    ]
  }

  updateRent(e) {
    const rent = e.target.value
    this.setValue('monthly_rent', rent.replace(/[^\d]/g, ''))
  }

  select(e) {
    e.target.select()
  }

  half() {
    this.setState({
      half: !this.state.half
    })
  }

  dollarize(input) {
    return <Dollarize>{input}</Dollarize>
  }

  render() {
    if (this.managerId === undefined || this.managerId === 0) {
      return <ErrorPage message="I can't go for that"/>
    }
    const property = this.state.property
    let parking = Range(property.parking_per_unit)

    return (
      <form
        ref="PropertyForm"
        className="property-form"
        method="post"
        action="./properties/Property">
        <h2>Property for {this.state.manager.company_name}</h2>
        <div className="row bg-info">
          <div className="col-sm-12 ">
            <InputField
              name="name"
              label="Title"
              value={property.name}
              errorMessage={this.state.errors.name
              ? 'Title may not be empty'
              : null}
              change={this.setValue.bind(this, 'name')}
              required={true}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              value={property.description}
              onChange={this.setValue.bind(this, 'description')}/>
          </div>
        </div>
        <div className="row bg-info">
          <div className="col-sm-12">
            <InputField
              name="address"
              label="Address"
              type="text"
              placeholder="Street, City, State, Zip code"
              errorMessage={this.state.errors.address
              ? 'Address may not be empty'
              : null}
              value={property.address}
              change={this.setValue.bind(this, 'address')}
              required={true}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-5">
            <InputField
              name="monthly_rent"
              type="type"
              label="Monthly rent"
              wrap={this.dollarize}
              errorMessage={this.state.errors.monthly_rent
              ? 'Rent amount may not be empty'
              : null}
              value={property.monthly_rent}
              change={this.updateRent}
              required={true}/>
          </div>
          <div className="col-sm-7">
            <div style={{
              marginBottom: '.5em'
            }}>
              <ButtonGroup
                name="lease_type"
                buttons={this.getLeaseType()}
                match={property.lease_type}
                handle={this.setIntegerValue.bind(this, 'lease_type')}
                activeColor="success"/>
            </div>
            <div>
              <BooleanButton
                name="efficiency"
                current={property.efficiency}
                label={['Efficiency', 'Not an efficiency']}
                icon={true}
                handleClick={this.setValue.bind(this, 'efficiency')}/>
            </div>
          </div>
        </div>
        <div className="row bg-info">
          <div className="col-sm-6 form-inline">
            <label htmlFor="contract-length">Contract length</label>
            <select
              name="contract_length"
              id="contract-length"
              value={property.contract_length}
              className="form-control"
              onChange={this.setIntegerValue.bind(this, 'contract_length')}>
              <option value="1">Monthly</option>
              <option value="8">Five months</option>
              <option value="2">Six months</option>
              <option value="7">Ten months</option>
              <option value="3">Twelve months</option>
              <option value="4">Summer only</option>
              <option value="5">per Semester</option>
              <option value="6">School year (two semesters)</option>
            </select>
            <div style={{
              marginTop: '.5em'
            }}>
              <BooleanButton
                name="sublease"
                current={property.sublease}
                label={['Tenant may sublease', 'Tenant may not sublease']}
                icon={true}
                handleClick={this.setValue.bind(this, 'sublease')}/>
            </div>
          </div>
          <div className="col-sm-6">
            <label>Move-in date</label>
            <DateField
              dateFormat="YYYY-MM-DD"
              onChange={this.setMoveIn}
              value={this.getMoveInDate()}/>
          </div>
        </div>
        <Rooms property={property} setValue={this.setValue}/>
        <div className="row bg-info">
          <div className="col-sm-6">
            <div className="pull-left">
              <label>Parking spaces per unit</label>
              <input
                name="parking_per_unit"
                type="text"
                size="2"
                onChange={this.updateParking}
                onClick={this.select}
                value={property.parking_per_unit}
                className="single-input"/>
            </div>
            <ButtonGroup
              buttons={parking}
              match={property.parking_per_unit}
              handle={this.updateParking}
              activeColor="success"/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label>Student preference</label>
            <ButtonGroup
              name="student_type"
              buttons={this.studentType()}
              match={property.student_type}
              handle={this.setIntegerValue.bind(this, 'student_type')}
              activeColor="success"/>
          </div>
        </div>
        <div className="row bg-info">
          <div className="col-sm-12">
            <label>Miles from campus</label>
            <ButtonGroup
              name="campus_distance"
              buttons={this.campusDistance()}
              match={property.campus_distance}
              handle={this.setIntegerValue.bind(this, 'campus_distance')}
              activeColor="success"/>
          </div>
        </div>
        <SubmitForm check={this.checkForm}/>
        <Utilities
          property={property}
          setValue={this.setValue}
          setIntegerValue={this.setIntegerValue}/>
        <Features property={property} setValue={this.setValue}/>
        <SubmitForm check={this.checkForm}/>
        <Pets
          property={this.state.property}
          setValue={this.setValue}
          show={this.state.petForm}/>
        <Fees property={property} setValue={this.setValue}/>
        <UtilityImbursement property={property} setValue={this.setValue}/>
        <SubmitForm check={this.checkForm}/>
      </form>
    )
  }
}
PropertyForm.propTypes = {
  address: React.PropTypes.string
}

const SubmitForm = ({check}) => {
  return (
    <div className="submit-form">
      <button type="submit" className="btn btn-primary btn-lg" onClick={check}>
        <i className="fa fa-save"></i>&nbsp;Save property</button>
    </div>
  )
}

SubmitForm.propTypes = {
  check: React.PropTypes.func
}
