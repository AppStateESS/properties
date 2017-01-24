'use strict'
import React from 'react'
import BooleanButton from '../Mixin/BooleanButton.jsx'

export default class Features extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const property = this.props.property
    return (
      <div>
        <h3>Amenities</h3>
        <div className="row">
          <div className="col-sm-6">
            <p>
              <BooleanButton
                name="utilities_inc"
                current={property.utilities_inc}
                label={['Utilities included', 'Utilities not included']}
                icon={true}
                handleClick={this.props.setValue.bind(this, 'utilities_inc')}/>
            </p>
            <p>
              <BooleanButton
                name="furnished"
                current={property.furnished}
                label={['Furnished', 'Not furnished']}
                icon={true}
                handleClick={this.props.setValue.bind(this, 'furnished')}/>
            </p>
            <p>
              <BooleanButton
                name="dishwasher"
                current={property.dishwasher}
                label={['Dishwasher included', 'No dishwasher']}
                icon={true}
                handleClick={this.props.setValue.bind(this, 'dishwasher')}/>
            </p>
            <p>
              <BooleanButton
                name="airconditioning"
                current={property.airconditioning}
                icon={true}
                label={['Air conditioning', 'No air conditioning']}
                handleClick={this.props.setValue.bind(this, 'airconditioning')}/>
            </p>
          </div>
          <div className="col-sm-6">
            <p>
              <BooleanButton
                name="appalcart"
                current={property.appalcart}
                icon={true}
                label={['On Appalcart route', 'Not on Appalcart route']}
                handleClick={this.props.setValue.bind(this, 'appalcart')}/>
            </p>
            <p>
              <BooleanButton
                name="clubhouse"
                current={property.clubhouse}
                icon={true}
                label={['Club house available', 'No club house']}
                handleClick={this.props.setValue.bind(this, 'clubhouse')}/>
            </p>
            <p>
              <BooleanButton
                current={property.workout_room}
                name="workout_room"
                icon={true}
                label={['Workout room', 'No workout room']}
                handleClick={this.props.setValue.bind(this, 'workout_room')}/>
            </p>
            <p>
            <BooleanButton
              name="smoking_allowed"
              label={['Smoking allowed', 'No smoking allowed']}
              current={property.utilities_inc}
              icon={true}
              handleClick={this.props.setValue.bind(this, 'smoking_allowed')}/>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

Features.propTypes = {
  property: React.PropTypes.object,
  setValue: React.PropTypes.func
}
