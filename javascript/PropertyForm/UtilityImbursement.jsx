'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputField from '../Mixin/Form/InputField.jsx'
import Dollarize from '../Mixin/Form/Dollarize.jsx'

export default class UtilityImbursement extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const property = this.props.property
    return (
      <div>
        <h3>Utility imbursement</h3>
        <p>If you pay a portion of utilities, please enter that amount below.</p>
        <div className="row">
          <div className="col-xs-6 col-sm-4 col-md-3">
            <label>Cable</label>
            <Dollarize>
              <InputField
                name="util_cable"
                value={property.util_cable}
                change={this.props.setValue.bind(this, 'util_cable')}/>
            </Dollarize>
          </div>
          <div className="col-xs-6 col-sm-4 col-md-3">
            <label>Fuel/Gas</label>
            <Dollarize>
              <InputField
                name="util_fuel"
                value={property.util_fuel}
                change={this.props.setValue.bind(this, 'util_fuel')}/>
            </Dollarize>
          </div>
          <div className="col-xs-6 col-sm-4 col-md-3">
            <label>Internet</label>
            <Dollarize>
              <InputField
                name="util_internet"
                value={property.util_internet}
                change={this.props.setValue.bind(this, 'util_internet')}/>
            </Dollarize>
          </div>
          <div className="col-xs-6 col-sm-4 col-md-3">
            <label>Phone</label>
            <Dollarize>
              <InputField
                name="util_phone"
                value={property.util_phone}
                change={this.props.setValue.bind(this, 'util_phone')}/>
            </Dollarize>
          </div>
          <div className="col-xs-6 col-sm-4 col-md-3">
            <label>Power</label>
            <Dollarize>
              <InputField
                name="util_power"
                value={property.util_power}
                change={this.props.setValue.bind(this, 'util_power')}/>
            </Dollarize>
          </div>
          <div className="col-xs-6 col-sm-4 col-md-3">
            <label>Trash</label>
            <Dollarize>
              <InputField
                name="util_trash"
                value={property.util_trash}
                change={this.props.setValue.bind(this, 'util_trash')}/>
            </Dollarize>
          </div>
          <div className="col-xs-6 col-sm-4 col-md-3">
            <label>Water</label>
            <Dollarize>
              <InputField
                name="util_water"
                value={property.util_water}
                change={this.props.setValue.bind(this, 'util_water')}/>
            </Dollarize>
          </div>
        </div>
      </div>
    )
  }
}
UtilityImbursement.propTypes = {
  property: PropTypes.object,
  setValue: PropTypes.func
}
