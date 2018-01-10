'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputField from '../Mixin/Form/InputField.jsx'
import BooleanButton from '../Mixin/Form/BooleanButton.jsx'

export default class Fees extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.setToZero = this.setToZero.bind(this)
  }

  setToZero(varname) {
    let value = this.props.property[varname]

    value = value.replace(/[^\d]/g, '')
    if (value == '') {
      value = '0'
    }
    this.props.setValue(varname, value)
  }

  render() {
    const property = this.props.property
    return (
      <div>
        <h3>Deposits and Fees</h3>
        <div className="row">
          <div className="col-xs-6 col-sm-4">
            <label>Security deposit</label>
            <BooleanButton
              name="security_refund"
              current={property.security_refund}
              label={['Deposit refunded', 'Nonrefundable',]}
              handleClick={this.props.setValue.bind(this, 'security_refund')}/>
            <div className="input-group">
              <span className="input-group-addon">$</span>
              <InputField
                name="security_amt"
                type="text"
                maxLength={6}
                value={property.security_amt}
                blur={this.setToZero.bind(this, 'security_amt')}
                change={this.props.setValue.bind(this, 'security_amt')}/>
              <span className="input-group-addon">.00</span>
            </div>
          </div>
          <div className="col-xs-6 col-sm-4">
            <label>Administrative Fee</label>
            <BooleanButton
              name="admin_fee_refund"
              handleClick={this.props.setValue.bind(this, 'admin_fee_refund')}
              current={property.admin_fee_refund}
              label={['Admin fee refunded', 'Nonrefundable',]}/>
            <div className="input-group">
              <span className="input-group-addon">$</span>
              <InputField
                name="admin_fee_amt"
                maxLength={6}
                type="text"
                blur={this.setToZero.bind(this, 'admin_fee_amt')}
                value={property.admin_fee_amt}
                change={this.props.setValue.bind(this, 'admin_fee_amt')}/>
              <span className="input-group-addon">.00</span>
            </div>
          </div>
          <div className="col-xs-6 col-sm-4">
            <label>Cleaning fee</label>
            <BooleanButton
              name="clean_fee_refund"
              handleClick={this.props.setValue.bind(this, 'clean_fee_refund')}
              current={property.clean_fee_refund}
              label={['Fee refunded', 'Nonrefundable',]}/>
            <div className="input-group">
              <span className="input-group-addon">$</span>
              <InputField
                name="clean_fee_amt"
                type="text"
                maxLength={6}
                value={property.clean_fee_amt}
                blur={this.setToZero.bind(this, 'clean_fee_amt')}
                change={this.props.setValue.bind(this, 'clean_fee_amt')}/>
              <span className="input-group-addon">.00</span>
            </div>
          </div>
          <div className="col-xs-6 col-sm-4">
            <label>Parking Fee</label>
            <div className="input-group">
              <span className="input-group-addon">$</span>
              <InputField
                name="parking_fee"
                maxLength={6}
                type="text"
                value={property.parking_fee}
                blur={this.setToZero.bind(this, 'parking_fee')}
                change={this.props.setValue.bind(this, 'parking_fee')}/>
              <span className="input-group-addon">.00</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label>Other fees</label>
            <textarea
              className="form-control"
              value={property.other_fees}
              onChange={this.props.setValue.bind(this, 'other_fees')}
              name="other_fees"/>
          </div>
        </div>
      </div>
    )
  }
}

Fees.propTypes = {
  property: PropTypes.object,
  setValue: PropTypes.func
}
