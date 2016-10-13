'use strict'
import React from 'react'
import InputField from '../Mixin/InputField.jsx'

export default class Pets extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            <label>Deposit</label>
            (Refundable)
            <div className="input-group">
              <span className="input-group-addon">$</span>
              <InputField
                name="pet_deposit"
                type="text"
                value={this.props.property.pet_deposit}
                disabled={!this.props.show}
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
                disabled={!this.props.show}
                value={this.props.property.pet_fee}
                change={this.props.setValue.bind(this, 'pet_fee')}/>
              <span className="input-group-addon">.00</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label htmlFor="pet-type">Allowed pet types (i.e. cats, dogs)</label>
            <textarea
              disabled={!this.props.show}
              className="form-control"
              id="pet-type"
              value={this.props.property.pet_type}
              onChange={this.props.setValue.bind(this, 'pet_type')}></textarea>
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
