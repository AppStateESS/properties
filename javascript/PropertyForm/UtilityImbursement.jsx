'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputField from '@essappstate/canopy-react-inputfield'
import Dollarize from '../Mixin/Form/Dollarize.jsx'

export default class UtilityImbursement extends Component {
  constructor(props) {
    super(props)
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

  dollarize(input) {
    return <Dollarize>{input}</Dollarize>
  }

  render() {
    const property = this.props.property
    return (
      <div>
        <h3>Utility imbursement</h3>
        <p>If you pay a portion of utilities, please enter that amount below.</p>
        <div className="row">
          <div className="col-6 col-sm-4 col-md-3">
            <label>Cable</label>
            <InputField
              name="util_cable"
              wrap={this.dollarize}
              value={property.util_cable}
              blur={this.setToZero.bind(this, 'util_cable')}
              change={this.props.setValue.bind(this, 'util_cable')}/>
          </div>
          <div className="col-6 col-sm-4 col-md-3">
            <label>Fuel/Gas</label>
            <InputField
              name="util_fuel"
              wrap={this.dollarize}
              value={property.util_fuel}
              blur={this.setToZero.bind(this, 'util_fuel')}
              change={this.props.setValue.bind(this, 'util_fuel')}/>
          </div>
          <div className="col-6 col-sm-4 col-md-3">
            <label>Internet</label>
            <InputField
              name="util_internet"
              wrap={this.dollarize}
              value={property.util_internet}
              blur={this.setToZero.bind(this, 'util_internet')}
              change={this.props.setValue.bind(this, 'util_internet')}/>
          </div>
          <div className="col-6 col-sm-4 col-md-3">
            <label>Phone</label>
            <InputField
              name="util_phone"
              wrap={this.dollarize}
              value={property.util_phone}
              blur={this.setToZero.bind(this, 'util_phone')}
              change={this.props.setValue.bind(this, 'util_phone')}/>
          </div>
          <div className="col-6 col-sm-4 col-md-3">
            <label>Power</label>
            <InputField
              name="util_power"
              wrap={this.dollarize}
              value={property.util_power}
              blur={this.setToZero.bind(this, 'util_power')}
              change={this.props.setValue.bind(this, 'util_power')}/>
          </div>
          <div className="col-6 col-sm-4 col-md-3">
            <label>Trash</label>
            <InputField
              name="util_trash"
              wrap={this.dollarize}
              value={property.util_trash}
              blur={this.setToZero.bind(this, 'util_trash')}
              change={this.props.setValue.bind(this, 'util_trash')}/>
          </div>
          <div className="col-6 col-sm-4 col-md-3">
            <label>Water</label>
            <InputField
              name="util_water"
              wrap={this.dollarize}
              value={property.util_water}
              blur={this.setToZero.bind(this, 'util_water')}
              change={this.props.setValue.bind(this, 'util_water')}/>
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
