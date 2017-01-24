'use strict'
import React from 'react'
import bindMethods from '../Mixin/Bind.js'
import ButtonGroup from '../Mixin/ButtonGroup.jsx'
import UtilityImbursement from './UtilityImbursement.jsx'
import UtilityFunctions from '../Mixin/UtilityFunctions.js'

export default class Utilities extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    const methods = ['updateHeatType']
    bindMethods(methods, this)
  }

  heatingTypes() {
    return [
      {
        value: '1',
        label: 'Heat pump'
      }, {
        value: '2',
        label: 'Oil'
      }, {
        value: '3',
        label: 'Propane'
      }, {
        value: '4',
        label: 'Electric baseboard'
      }, {
        value: '5',
        label: 'Kerosene'
      }, {
        value: '6',
        label: 'Woodstove/Fireplace'
      }, {
        value: '7',
        label: 'Natural gas'
      }
    ]
  }

  updateHeatType(type) {
    let heatType = this.props.property.heat_type
    const index = heatType.indexOf(type)
    if (index === -1) {
      heatType.push(type)
    } else {
      heatType.splice(index, 1)
    }
    this.props.setValue('heat_type', heatType)
  }

  render() {
    const {property} = this.props
    return (
      <div>
        <h3>Utilities</h3>
        <div className="row">
          <div className="col-sm-12">
            <label>Heating</label>
            <small>(Click all that apply)</small>
            <ButtonGroup
              name="heat_type"
              multiple={true}
              buttons={this.heatingTypes()}
              match={property.heat_type}
              handle={this.updateHeatType}
              activeColor="success"/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label>Internet</label><br />
            <ButtonGroup
              name="internet_type"
              buttons={UtilityFunctions.internetTypes()}
              match={property.internet_type}
              handle={this.props.setIntegerValue.bind(this, 'internet_type')}
              activeColor="success"/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label>Laundry</label><br />
            <ButtonGroup
              name="laundry_type"
              buttons={UtilityFunctions.laundryTypes()}
              match={property.laundry_type}
              handle={this.props.setIntegerValue.bind(this, 'laundry_type')}
              activeColor="success"/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label>Trash and Recycling</label><br />
            <ButtonGroup
              name="trash_type"
              buttons={UtilityFunctions.trashTypes()}
              match={property.trash_type}
              handle={this.props.setIntegerValue.bind(this, 'trash_type')}
              activeColor="success"/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label>Television</label><br />
            <ButtonGroup
              name="tv_type"
              buttons={UtilityFunctions.televisionTypes()}
              match={property.tv_type}
              handle={this.props.setIntegerValue.bind(this, 'tv_type')}
              activeColor="success"/>
          </div>
        </div>
        <UtilityImbursement property={this.props.property} setValue={this.props.setValue}/>
      </div>
    )
  }
}

Utilities.propTypes = {
  property: React.PropTypes.object,
  setIntegerValue: React.PropTypes.func,
  setValue: React.PropTypes.func
}
