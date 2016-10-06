'use strict'
/* global require */
import React from 'react'
import PetForm from './PetForm.jsx'
import DecodeUrl from '../Mixin/DecodeUrl.js'
import InputField from '../Mixin/InputField.jsx'
import PropertyObject from '../Mixin/PropertyObject.js'
import ErrorPage from '../Mixin/ErrorPage.jsx'
import ButtonGroup from '../Mixin/ButtonGroup.jsx'
import BooleanButton from '../Mixin/BooleanButton.jsx'
import 'react-date-picker/index.css'
import {DateField} from 'react-date-picker'
import moment from 'moment'

class PropertyForm extends React.Component {
  constructor() {
    super()
    const url = new DecodeUrl
    this.managerId = url.values['managerId']
    this.state = {
      property: PropertyObject,
      petForm: PropertyObject.pets_allowed
    }
    this.setValue = this.setValue.bind(this)
    this.setMoveIn = this.setMoveIn.bind(this)
    this.togglePets = this.togglePets.bind(this)
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
        onClick: this.setValue.bind(this, 'lease_type', 0),
        value: 0,
        label: <span>
            <i className="fa fa-users"></i>&nbsp; Per unit</span>
      }, {
        active: this.state.property.lease_type === 1,
        onClick: this.setValue.bind(this, 'lease_type', 1),
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

  render() {
    if (this.managerId === undefined || this.managerId === 0) {
      return <ErrorPage message="I can't go for that"/>
    }
    const property = this.state.property

    return (
      <div>
        <InputField
          name="name"
          label="Title"
          value={property.name}
          change={this.setValue.bind(this, 'name')}
          required={true}/>

        <div className="marginBottom">
          <div className="form-inline">
            <InputField
              name="monthly_rent"
              label="Monthly rent"
              type="text"
              value={property.monthly_rent}
              change={this.setValue.bind(this, 'monthly_rent')}
              required={true}/>
            <ButtonGroup buttons={this.getLeaseType()}/>
          </div>
        </div>
        <div className="marginBottom">
          <label>Move-in date</label>
          <DateField
            dateFormat="YYYY-MM-DD"
            onChange={this.setMoveIn}
            value={this.getMoveInDate()}/>
        </div>

        <InputField
          name="address"
          label="Address"
          type="text"
          value={property.address}
          change={this.setValue.bind(this, 'address')}
          required={true}/>

        <fieldset>
          <legend>Features</legend>
          <div className="row">
            <div className="col-sm-6">
              <table className="table">
                <tbody>
                  <tr>
                    <td>Utilities included</td>
                    <td className="text-right">
                      <BooleanButton
                        current={property.utilities_inc}
                        handleClick={this.setValue.bind(this, 'utilities_inc')}/>
                    </td>
                  </tr>
                  <tr>
                    <td>Efficiency</td>
                    <td className="text-right">
                      <BooleanButton
                        current={property.efficiency}
                        handleClick={this.setValue.bind(this, 'efficiency')}/>
                    </td>
                  </tr>
                  <tr>
                    <td>Subleasing permitted</td>
                    <td className="text-right">
                      <BooleanButton
                        current={property.sublease}
                        handleClick={this.setValue.bind(this, 'sublease')}/>
                    </td>
                  </tr>
                  <tr>
                    <td>Furnished</td>
                    <td className="text-right">
                      <BooleanButton
                        current={property.furnished}
                        handleClick={this.setValue.bind(this, 'furnished')}/>
                    </td>
                  </tr>
                  <tr>
                    <td>Dishwasher</td>
                    <td className="text-right">
                      <BooleanButton
                        current={property.dishwasher}
                        handleClick={this.setValue.bind(this, 'dishwasher')}/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-sm-6">
              <table className="table">
                <tbody>
                  <tr>
                    <td>Windows (i.e. not in basement)</td>
                    <td className="text-right">
                      <BooleanButton
                        current={property.window_number}
                        handleClick={this.setValue.bind(this, 'window_number')}/>
                    </td>
                  </tr>
                  <tr>
                    <td>Air Conditioning</td>
                    <td className="text-right">
                      <BooleanButton
                        current={property.airconditioning}
                        handleClick={this.setValue.bind(this, 'airconditioning')}/>
                    </td>
                  </tr>
                  <tr>
                    <td>Appalcart route</td>
                    <td className="text-right">
                      <BooleanButton
                        current={property.appalcart}
                        handleClick={this.setValue.bind(this, 'appalcart')}/>
                    </td>
                  </tr>
                  <tr>
                    <td>Clubhouse</td>
                    <td className="text-right">
                      <BooleanButton
                        current={property.clubhouse}
                        handleClick={this.setValue.bind(this, 'clubhouse')}/>
                    </td>
                  </tr>
                  <tr>
                    <td>Workout room</td>
                    <td className="text-right">
                      <BooleanButton
                        current={property.workout_room}
                        handleClick={this.setValue.bind(this, 'workout_room')}/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Pets</legend>
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
        </fieldset>

      </div>
    )
  }
}

PropertyForm.propTypes = {
  address: React.PropTypes.string
}

export default PropertyForm
