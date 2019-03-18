'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputField from '@essappstate/canopy-react-inputfield'
import BooleanButton from '../Mixin/Form/BooleanButton'
import Dollarize from '../Mixin/Form/Dollarize'

export default class Pets extends Component {
  constructor(props) {
    super(props)
  }

  obscurePetForm() {
    if (this.props.property.pets_allowed) {
      return {opacity: '1'}
    } else {
      return {opacity: '.4'}
    }
  }

  setToZero(varname) {
    let value = this.props.property[varname]

    value = value.replace(/[^\d]/g, '')
    if (value == '') {
      value = '0'
    }
    this.props.setValue(varname, value)
  }

  togglePets(allowed) {
    this.props.setValue('pets_allowed', allowed)
  }

  togglePetDep(refund) {
    this.props.setValue('pet_dep_refund', refund)
  }

  render() {
    const {property} = this.props
    return (
      <div>
        <h3>Pets</h3>
        <BooleanButton
          name="pets_allowed"
          label={['Pets allowed', 'Pets not allowed',]}
          icon={['fa fa-check', 'fa fa-times',]}
          handleClick={this.togglePets.bind(this, !property.pets_allowed)}
          current={property.pets_allowed}/>
        <div style={this.obscurePetForm()}>
          <div className="row">
            <div className="col-sm-6">
              <label className="mr-1">Deposit</label>
              <BooleanButton
                name="pet_dep_refund"
                current={property.pet_dep_refund}
                handleClick={this.togglePetDep.bind(this, !property.pet_dep_refund)}
                label={['Deposit refunded', 'Nonrefundable',]}/>
              <Dollarize>
                <InputField
                  name="pet_deposit"
                  type="text"
                  size="8"
                  value={property.pet_deposit}
                  blur={this.setToZero.bind(this, 'pet_deposit')}
                  disabled={!property.pets_allowed}
                  change={this.props.setValue.bind(this, 'pet_deposit')}/>
              </Dollarize>
            </div>
            <div className="col-sm-6">
              <label>Monthly fee</label>
              <Dollarize>
                <InputField
                  name="pet_fee"
                  type="text"
                  size="8"
                  disabled={!property.pets_allowed}
                  value={property.pet_fee}
                  blur={this.setToZero.bind(this, 'pet_fee')}
                  change={this.props.setValue.bind(this, 'pet_fee')}/>
              </Dollarize>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <label htmlFor="pet-type">Allowed pet types (i.e. cats, dogs)</label>
              <textarea
                disabled={!property.pets_allowed}
                className="form-control"
                rows="4"
                id="pet-type"
                value={property.pet_type}
                onChange={this.props.setValue.bind(this, 'pet_type')}></textarea>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Pets.propTypes = {
  property: PropTypes.object,
  setValue: PropTypes.func
}
