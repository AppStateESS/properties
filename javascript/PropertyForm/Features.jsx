'use strict'
import React from 'react'
import BooleanButton from '../Mixin/Form/BooleanButton.jsx'
import BigCheckbox from '../Mixin/Form/BigCheckbox.jsx'

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
              <BigCheckbox
                label="Utilities included"
                checked={property.utilities_inc}
                handle={this.props.setValue.bind(this, 'utilities_inc')}/>
            </p>
            <p>
              <BigCheckbox
                label="Furnished"
                checked={property.furnished}
                handle={this.props.setValue.bind(this, 'furnished')}/>
            </p>
            <p>
              <BigCheckbox
                label="Dishwasher included"
                checked={property.dishwasher}
                handle={this.props.setValue.bind(this, 'dishwasher')}/>
            </p>
            <p>
              <BigCheckbox
                label="Air conditioning"
                checked={property.airconditioning}
                handle={this.props.setValue.bind(this, 'airconditioning')}/>
            </p>
          </div>
          <div className="col-sm-6">
            <p>
              <BigCheckbox
                label="On Appalcart route"
                checked={property.appalcart}
                handle={this.props.setValue.bind(this, 'appalcart')}/>
            </p>
            <p>
              <BigCheckbox
                label="Club house available"
                checked={property.clubhouse}
                handle={this.props.setValue.bind(this, 'clubhouse')}/>
            </p>
            <p>
              <BigCheckbox
                label="Workout room"
                checked={property.workout_room}
                handle={this.props.setValue.bind(this, 'workout_room')}/>
            </p>
            <p>
              <BigCheckbox
                label="No smoking preference"
                checked={property.smoking_allowed}
                handle={this.props.setValue.bind(this, 'smoking_allowed')}/>
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
