'use strict'
import React from 'react'
import {DateField} from 'react-date-picker'
import bindMethods from '../Mixin/Bind.js'
import Rooms from './Rooms.jsx'
import InputField from '../Mixin/InputField.jsx'
import ButtonGroup from '../Mixin/ButtonGroup.jsx'
import Dollarize from '../Mixin/Dollarize.jsx'
import Range from '../Mixin/Range.js'
import moment from 'moment'

export default class Basic extends React.Component {
  constructor(props) {
    super(props)

    const methods = ['setMoveIn', 'updateParking', 'updateRent']
    bindMethods(methods, this)
  }

  getMoveInDate() {
    return String(moment(this.props.property.move_in_date * 1000).format('YYYY-MM-DD'))
  }

  dollarize(input) {
    return <Dollarize>{input}</Dollarize>
  }

  getLeaseType() {
    return [
      {
        value: '0',
        label: <span>
            <i className="fa fa-users"></i>&nbsp; Per unit</span>
      }, {
        value: '1',
        label: <span>
            <i className="fa fa-user"></i>&nbsp; Per tenant</span>
      }
    ]
  }

  updateParking(parking) {
    if (typeof parking === 'object') {
      parking = Number(parking.target.value)
    } else {
      parking = Number(parking)
    }
    if (parking >= 1 && parking <= 6) {
      this.props.setValue('parking_per_unit', parking)
    }
  }

  setMoveIn(a) {
    let date = String(moment(a).format('X'))
    this.props.setValue('move_in_date', date)
  }

  updateRent(e) {
    const rent = e.target.value
    this.props.setValue('monthly_rent', rent.replace(/[^\d]/g, ''))
  }

  studentType() {
    let types = [
      {
        value: '0',
        label: 'No preference'
      }, {
        value: '1',
        label: 'Undergraduate'
      }, {
        value: '2',
        label: 'Graduate'
      }
    ]
    return types
  }

  campusDistance() {
    return [
      {
        value: '0',
        label: '0 to 5'
      }, {
        value: '5',
        label: '5 to 10'
      }, {
        value: '10',
        label: '10 to 25'
      }, {
        value: '25',
        label: 'More than 25'
      }
    ]
  }

  propertyType() {
    return [
      {
        value: '0',
        label: 'Apartment'
      }, {
        value: '1',
        label: 'Efficiency'
      }, {
        value: '2',
        label: 'House'
      }, {
        value: '3',
        label: 'Condo'
      }, {
        value: '4',
        label: 'Townhouse'
      }, {
        value: '5',
        label: 'Duplex'
      }
    ]
  }

  googleize(address) {
    return 'http://maps.google.com/maps?q=' + address.replace(/[\W]/g, '+').replace(/\+{2,}/g, '+')
  }

  render() {
    const {property} = this.props
    let parking = Range(property.parking_per_unit)
    const buttonspace = {
      paddingTop: '43px'
    }
    return (
      <div>
        <div className="row bg-info">
          <div className="col-sm-12 ">
            <InputField
              name="name"
              label="Title"
              value={property.name}
              errorMessage={this.props.errors.name
              ? 'Title may not be empty'
              : null}
              change={this.props.setValue.bind(null, 'name')}
              required={true}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label>Description</label>
            <textarea
              className="form-control"
              placeholder="Description is not searchable. Be sure to use other settings as well."
              name="description"
              value={property.description}
              onChange={this.props.setValue.bind(null, 'description')}/>
          </div>
        </div>
        <div className="row bg-info">
          <div className="col-sm-12">
            <InputField
              name="address"
              label="Address"
              type="text"
              placeholder="Street, City, State, Zip code"
              errorMessage={this.props.errors.address
              ? 'Address may not be empty'
              : null}
              value={property.address}
              change={this.props.setValue.bind(null, 'address')}
              required={true}/>
              {(property.address.length > 10) ? <small><a href={this.googleize(property.address)} target="_blank">View on Google Maps</a></small> : null}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-5 col-xs-7">
            <InputField
              ref="monthlyRent"
              name="monthly_rent"
              type="type"
              label="Monthly rent"
              wrap={this.dollarize}
              errorMessage={this.props.errors.monthly_rent
              ? 'Rent amount may not be empty'
              : null}
              value={property.monthly_rent}
              change={this.updateRent}
              required={true}/>
          </div>
          <div className="col-sm-7 col-xs-5" style={buttonspace}>
            <ButtonGroup
              name="lease_type"
              buttons={this.getLeaseType()}
              match={property.lease_type}
              handle={this.props.setValue.bind(null, 'lease_type')}
              activeColor="success"/>
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
              onChange={this.props.setIntegerValue.bind(null, 'contract_length')}>
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
            <label>Move-in date</label><br/>
            <DateField
              dateFormat="YYYY-MM-DD"
              onChange={this.setMoveIn}
              value={this.getMoveInDate()}/>
          </div>
        </div>

        <Rooms property={property} setValue={this.props.setValue}/>

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
          <div className="col-sm-6">
            <label>Miles from campus</label><br/>
            <ButtonGroup
              name="campus_distance"
              buttons={this.campusDistance()}
              match={property.campus_distance}
              handle={this.props.setValue.bind(this, 'campus_distance')}
              activeColor="success"/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label>Property type</label><br/>
            <ButtonGroup
              name="proptype"
              buttons={this.propertyType()}
              match={property.proptype}
              handle={this.props.setValue.bind(this, 'proptype')}
              activeColor="success"/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 bg-info">
            <label>Student preference</label>
            <br/>
            <ButtonGroup
              name="student_type"
              buttons={this.studentType()}
              match={property.student_type}
              handle={this.props.setValue.bind(this, 'student_type')}
              activeColor="success"/>
          </div>
        </div>
      </div>
    )
  }
}
Basic.propTypes = {
  property: React.PropTypes.object,
  setValue: React.PropTypes.func,
  setIntegerValue: React.PropTypes.func,
  errors: React.PropTypes.object
}
