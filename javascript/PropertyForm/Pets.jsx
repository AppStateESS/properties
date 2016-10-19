'use strict'
import React from 'react'
import InputField from '../Mixin/InputField.jsx'
import BooleanButton from '../Mixin/BooleanButton.jsx'

export default class Pets extends React.Component {
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

  togglePets(allowed) {
    this.props.setValue('pets_allowed', allowed)
  }

  render() {
    const {property} = this.props
    return (
      <div>
        <h3>Pets</h3>
        <BooleanButton
          name="pets_allowed"
          label={['Pets allowed', 'Pets not allowed']}
          icon={['fa fa-check', 'fa fa-times']}
          handleClick={this.togglePets.bind(this, !property.pets_allowed)}
          current={property.pets_allowed}/>
        <div style={this.obscurePetForm()}>
          <div className="row">
            <div className="col-sm-6">
              <label>Deposit</label>
              (Refundable)
              <div className="input-group">
                <span className="input-group-addon">$</span>
                <InputField
                  name="pet_deposit"
                  type="text"
                  value={property.pet_deposit}
                  disabled={!property.pets_allowed}
                  change={this.props.setValue.bind(this, 'pet_deposit')}/>
                <span className="input-group-addon">.00</span>
              </div>
            </div>
            <div className="col-sm-6">
              <label>Fee</label>
              (Non-refundable)
              <div className="input-group">
                <span className="input-group-addon">$</span>
                <InputField
                  name="pet_fee"
                  type="text"
                  disabled={!property.pets_allowed}
                  value={property.pet_fee}
                  change={this.props.setValue.bind(this, 'pet_fee')}/>
                <span className="input-group-addon">.00</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <label htmlFor="pet-type">Allowed pet types (i.e. cats, dogs)</label>
              <textarea
                disabled={!property.pets_allowed}
                className="form-control"
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
  property: React.PropTypes.object,
  setValue: React.PropTypes.func,
  show: React.PropTypes.bool
}
