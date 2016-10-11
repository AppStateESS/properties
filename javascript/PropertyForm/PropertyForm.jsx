'use strict'
import React from 'react'
import PetForm from './PetForm.jsx'
import DecodeUrl from '../Mixin/DecodeUrl.js'
import InputField from '../Mixin/InputField.jsx'
import PropertyObject from '../Mixin/PropertyObject.js'
import PropertyFeatures from './PropertyFeatures.jsx'
import ErrorPage from '../Mixin/ErrorPage.jsx'
import ButtonGroup from '../Mixin/ButtonGroup.jsx'
import BooleanButton from '../Mixin/BooleanButton.jsx'
import 'react-date-picker/index.css'
import {DateField} from 'react-date-picker'
import moment from 'moment'
import classnames from 'classnames'

export default class PropertyForm extends React.Component {
  constructor() {
    super()
    const url = new DecodeUrl
    this.managerId = url.values['managerId']
    this.state = {
      property: PropertyObject,
      petForm: PropertyObject.pets_allowed,
      half: false
    }
    this.half = this.half.bind(this)
    this.setValue = this.setValue.bind(this)
    this.setMoveIn = this.setMoveIn.bind(this)
    this.togglePets = this.togglePets.bind(this)
    this.updateLease = this.updateLease.bind(this)
    this.updateBedroom = this.updateBedroom.bind(this)
    this.updateBathroom = this.updateBathroom.bind(this)
    this.updateStudentPreference = this.updateStudentPreference.bind(this)
  }

  setValue(varname, value) {
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
        active: this.state.property.lease_type === 0,
        value: 0,
        label: <span>
            <i className="fa fa-user"></i>&nbsp; Per unit</span>
      }, {
        active: this.state.property.lease_type === 1,
        value: 1,
        label: <span>
            <i className="fa fa-users"></i>&nbsp; Per tenant</span>
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

  updateLease(a) {
    this.setValue('lease_type', a)
  }

  updateBedroom(bedrooms) {
    if (typeof bedrooms === 'object') {
      bedrooms = Number(bedrooms.target.value)
    } else {
      bedrooms = Number(bedrooms)
    }
    if (bedrooms >= 1 && bedrooms <= 6) {
      this.setValue('bedroom_no', bedrooms)
    }
  }

  updateBathroom(bathrooms) {
    if (typeof bathrooms === 'object') {
      bathrooms = Number(bathrooms.target.value)
    } else {
      bathrooms = Number(bathrooms)
    }
    if (bathrooms >= 1 && bathrooms <= 7) {
      this.setValue('bathroom_no', bathrooms)
    }
  }

  updateStudentPreference(type) {
    this.setValue('student_type', type)
  }

  getRangeButtons(current, deci = false) {
    let range = []
    const start = deci
      ? 1.5
      : 1
    for (let i = start; i < 7; i++) {
      range.push({
        active: i === current,
        value: i,
        label: i
      })
    }
    return range
  }

  studentPreference() {
    let preferences = [
      {
        active: this.state.property.student_type === 0,
        value: 0,
        label: 'No preference'
      }, {
        active: this.state.property.student_type === 1,
        value: 1,
        label: 'Undergraduate'
      }, {
        active: this.state.property.student_type === 2,
        value: 2,
        label: 'Graduate'
      }
    ]
    return preferences
  }

  select(e) {
    e.target.select()
  }

  half() {
    this.setState({
      half: !this.state.half
    })
  }

  render() {
    if (this.managerId === undefined || this.managerId === 0) {
      return <ErrorPage message="I can't go for that"/>
    }
    const property = this.state.property
    let bedrooms = this.getRangeButtons(property.bedroom_no)
    let bathrooms = this.getRangeButtons(property.bathroom_no, this.state.half)

    const halfcn = classnames('marginLeft', 'btn', this.state.half
      ? 'btn-success'
      : 'btn-default')
    return (
      <div className="property-form">
        <div className="row bg-info">
          <div className="col-sm-12 ">
            <InputField
              name="name"
              label="Title"
              value={property.name}
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
              value={property.address}
              change={this.setValue.bind(this, 'address')}
              required={true}/>
          </div>
        </div>

        <div className="row bg-info">
          <div className="col-sm-12">
            <div className="form-inline">
              <InputField
                name="monthly_rent"
                label="Monthly rent"
                type="text"
                value={property.monthly_rent}
                change={this.setValue.bind(this, 'monthly_rent')}
                required={true}/>
              <ButtonGroup
                buttons={this.getLeaseType()}
                handle={this.updateLease}
                activeColor="success"/></div>
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

          </div>
          <div className="col-sm-6">
            <label>Move-in date</label>
            <DateField
              dateFormat="YYYY-MM-DD"
              onChange={this.setMoveIn}
              value={this.getMoveInDate()}/>
          </div>
        </div>
        <div className="row bg-info">
          <div className="col-sm-6">
            <label>Bedrooms</label>
            <input
              type="text"
              size="1"
              onClick={this.select}
              onChange={this.updateBedroom}
              value={property.bedroom_no}
              className="single-input"/><br/>
            <ButtonGroup
              buttons={bedrooms}
              handle={this.updateBedroom}
              activeColor="success"/>
          </div>
          <div className="col-sm-6">
            <div>
              <label>Bathrooms</label>
              <input
                type="text"
                size="3"
                onChange={this.updateBathroom}
                onClick={this.select}
                value={property.bathroom_no}
                className="single-input"/>
            </div>
            <ButtonGroup
              buttons={bathrooms}
              handle={this.updateBathroom}
              activeColor="success"/>
            <button className={halfcn} onClick={this.half}>1/2</button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <ButtonGroup
              buttons={this.studentPreference()}
              handle={this.updateStudentPreference}
              activeColor="success"/>
          </div>
        </div>
        <PropertyFeatures property={property} setValue={this.setValue}/>

        <h3>Pets</h3>
        <BooleanButton
          label={['Pets allowed', 'Pets not allowed']}
          icon={['fa fa-check', 'fa fa-times']}
          current={property.pets_allowed}
          handleClick={this.togglePets.bind(this, !property.pets_allowed)}/>
        <div className="marginTop">
          <div style={this.obscurePetForm()}>
            <PetForm
              property={this.state.property}
              setValue={this.setValue}
              show={this.state.petForm}/>
          </div>
        </div>

      </div>
    )
  }
}

PropertyForm.propTypes = {
  address: React.PropTypes.string
}
