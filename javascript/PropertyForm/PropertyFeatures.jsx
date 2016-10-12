'use strict'
import React from 'react'
import BooleanButton from '../Mixin/BooleanButton.jsx'

class PropertyFeatures extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const property = this.props.property
    return (
      <div>
        <h3>Conditions</h3>
        <p>
          <BooleanButton
            current={property.efficiency}
            label={['Efficiency', 'Not an efficiency']}
            icon={true}
            handleClick={this.props.setValue.bind(this, 'efficiency')}/>
        </p>
        <p>
          <BooleanButton
            current={property.sublease}
            label={['Tenant may sublease', 'Tenant may not sublease']}
            icon={true}
            handleClick={this.props.setValue.bind(this, 'sublease')}/>
        </p>
        <p>
          <BooleanButton
            current={property.window_number}
            icon={true}
            label={['Windows in unit', 'Windowless unit']}
            handleClick={this.props.setValue.bind(this, 'window_number')}/>
        </p>
        <div className="row">
          <div className="col-sm-6">
            <h3>Amenities</h3>
            <p>
              <BooleanButton
                current={property.utilities_inc}
                label={['Utilities included', 'Utilities not included']}
                icon={true}
                handleClick={this.props.setValue.bind(this, 'utilities_inc')}/>
            </p>
            <p>
              <BooleanButton
                current={property.furnished}
                label={['Furnished', 'Not furnished']}
                icon={true}
                handleClick={this.props.setValue.bind(this, 'furnished')}/>
            </p>
            <p>
              <BooleanButton
                current={property.dishwasher}
                label={['Dishwasher included', 'No dishwasher']}
                icon={true}
                handleClick={this.props.setValue.bind(this, 'dishwasher')}/>
            </p>
            <p>
              <BooleanButton
                current={property.airconditioning}
                icon={true}
                label={['Air conditioning', 'No air conditioning']}
                handleClick={this.props.setValue.bind(this, 'airconditioning')}/>
            </p>
            <p>
              <BooleanButton
                current={property.appalcart}
                icon={true}
                label={['On Appalcart route', 'Not on Appalcart route']}
                handleClick={this.props.setValue.bind(this, 'appalcart')}/>
            </p>
            <p>
              <BooleanButton
                current={property.clubhouse}
                icon={true}
                label={['Club house available', 'No club house']}
                handleClick={this.props.setValue.bind(this, 'clubhouse')}/>
            </p>
            <p>
              <BooleanButton
                current={property.workout_room}
                icon={true}
                label={['Workout room', 'No workout room']}
                handleClick={this.props.setValue.bind(this, 'workout_room')}/>
            </p>
          </div>
          <div className="col-sm-6">
            <label>something here?</label>
          </div>
        </div>
      </div>
    )
  }
}

PropertyFeatures.propTypes = {
  property: React.PropTypes.object,
  setValue: React.PropTypes.func
}

export default PropertyFeatures
