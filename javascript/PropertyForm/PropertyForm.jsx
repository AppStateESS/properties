'use strict'
import React from 'react'
import moment from 'moment'

import bindMethods from '../Mixin/Bind.js'
import {DateField} from 'react-date-picker'
import DecodeUrl from '../Mixin/DecodeUrl.js'
import PropertyObject from '../Mixin/PropertyObject.js'
import InputField, {RequiredIcon} from '../Mixin/InputField.jsx'
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
      errors : { name : false, address: false, monthly_rent: false}
    }
    const methods = [
      'half',
      'setValue',
      'setMoveIn',
      'togglePets',
      'updateHeatType',
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

    if (property.address.length === 0){
      errors.address = true
      errorFound = true
    } else {
      errors.address = false
    }

    if (errorFound) {
      this.setState({errors : errors})
      this.refs.PropertyForm.scrollIntoView()
    }
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

  togglePets(allowed) {
    this.setValue('pets_allowed', allowed)
    this.setState({petForm: allowed})
  }

  setMoveIn(a) {
    this.setValue('move_in_date', a)
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

  heatingTypes() {
    return [
      {
        value: 1,
        label: 'Heat pump'
      }, {
        value: 2,
        label: 'Oil'
      }, {
        value: 3,
        label: 'Propane'
      }, {
        value: 4,
        label: 'Electric baseboard'
      }, {
        value: 5,
        label: 'Kerosene'
      }, {
        value: 6,
        label: 'Woodstove/Fireplace'
      }, {
        value: 7,
        label: 'Natural gas'
      }
    ]
  }

  laundryTypes() {
    return [
      {
        value: 0,
        label: 'No laundry'
      }, {
        value: 1,
        label: 'Washer/Dryer in unit'
      }, {
        value: 2,
        label: 'Laundry room on premises'
      }, {
        value: 3,
        label: 'Washer/Dryer hook ups in unit'
      }
    ]
  }

  trashTypes() {
    return [
      {
        value: 0,
        label: 'No pickup or bins'
      }, {
        value: 1,
        label: 'Curbside pickup'
      }, {
        value: 2,
        label: 'Trash only, no recycling bins'
      }, {
        value: 3,
        label: 'Both bins on site'
      }
    ]
  }

  obscurePetForm() {
    if (this.state.petForm) {
      return {opacity: '1'}
    } else {
      return {opacity: '.4'}
    }
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

  internetTypes() {
    return [
      {
        value: 1,
        label: 'Dial up'
      }, {
        value: 2,
        label: 'DSL'
      }, {
        value: 3,
        label: 'Wireless'
      }, {
        value: 4,
        label: 'Satellite'
      }, {
        value: 5,
        label: 'Cable'
      }, {
        value: 6,
        label: 'DSL/Cable'
      }, {
        value: 7,
        label: 'Fiber'
      }
    ]
  }

  updateHeatType(type) {
    let heatType = this.state.property.heat_type

    const index = heatType.indexOf(type)
    if (index === -1) {
      heatType.push(type)
    } else {
      heatType.splice(index, 1)
    }
    this.setValue('heat_type', heatType)
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
      <form ref="PropertyForm" className="property-form" method="post" action="./properties/Property">
        <h2>Property for {this.state.manager.company_name}</h2>
        <div className="row bg-info">
          <div className="col-sm-12 ">
            <InputField
              name="name"
              label="Title"
              value={property.name}
              errorMessage={this.state.errors.name ? 'Title may not be empty': null}
              change={this.setValue.bind(this, 'name')}
              required={true}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <InputField
              name="address"
              label="Address"
              type="text"
              errorMessage={this.state.errors.address ? 'Address may not be empty': null}
              value={property.address}
              change={this.setValue.bind(this, 'address')}
              required={true}/>
          </div>
        </div>
        <div className="row bg-info">
          <div className="col-sm-5">
            <label>Monthly rent<RequiredIcon/></label>
              <InputField
                name="monthly_rent"
                type="type"
                wrap={this.dollarize}
                value={property.monthly_rent}
                change={this.setValue.bind(this, 'monthly_rent')}
                required={true}/>
          </div>
          <div className="col-sm-7">
            <div style={{marginBottom:'.5em'}}>
              <ButtonGroup
                buttons={this.getLeaseType()}
                match={property.lease_type}
                handle={this.setValue.bind(this, 'lease_type')}
                activeColor="success"/>
            </div>
            <div>
              <BooleanButton
                current={property.efficiency}
                label={['Efficiency', 'Not an efficiency']}
                icon={true}
                handleClick={this.setValue.bind(this, 'efficiency')}/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 form-inline">
            <label htmlFor="contract-length">Contract length</label>
            <select
              name="contract_length"
              id="contract-length"
              value={property.contract_length}
              className="form-control">
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
        <div className="row">
          <div className="col-sm-6">
            <div className="pull-left">
              <label>Parking spaces per unit</label>
              <input
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
        <SubmitForm check={this.checkForm}/>
        <div className="row bg-info">
          <div className="col-sm-12">
            <label>Heating</label>
            <small>(Click all that apply)</small>
            <ButtonGroup
              buttons={this.heatingTypes()}
              match={property.heat_type}
              handle={this.updateHeatType}
              activeColor="success"/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label>Internet</label>
            <ButtonGroup
              buttons={this.internetTypes()}
              match={property.internet_type}
              handle={this.setValue.bind(this, 'internet_type')}
              activeColor="success"/>
          </div>
        </div>
        <div className="row bg-info">
          <div className="col-sm-12">
            <label>Laundry</label>
            <ButtonGroup
              buttons={this.laundryTypes()}
              match={property.laundry_type}
              handle={this.setValue.bind(this, 'laundry_type')}
              activeColor="success"/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label>Trash and Recycling</label>
            <ButtonGroup
              buttons={this.trashTypes()}
              match={property.trash_type}
              handle={this.setValue.bind(this, 'trash_type')}
              activeColor="success"/>
          </div>
        </div>
        <div className="row bg-info">
          <div className="col-sm-12">
            <label>Student preference</label>
            <ButtonGroup
              buttons={this.studentType()}
              match={property.student_type}
              handle={this.setValue.bind(this, 'student_type')}
              activeColor="success"/>
          </div>
        </div>
        <Features property={property} setValue={this.setValue}/>
        <SubmitForm check={this.checkForm}/>
        <div className="row">
          <div className="col-sm-12">
            <h3>Pets</h3>
            <BooleanButton
              label={['Pets allowed', 'Pets not allowed']}
              icon={['fa fa-check', 'fa fa-times']}
              current={property.pets_allowed}
              handleClick={this.togglePets.bind(this, !property.pets_allowed)}/>
            <div style={this.obscurePetForm()}>
              <Pets
                property={this.state.property}
                setValue={this.setValue}
                show={this.state.petForm}/>
            </div>
          </div>
        </div>
        <Fees property={property} setValue={this.setValue}/>
        <Utilities property={property} setValue={this.setValue}/>
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
