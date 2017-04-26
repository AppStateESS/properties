'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import BigCheckbox from '../Mixin/Form/BigCheckbox.jsx'

export default class Features extends Component {
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
            <div>
              <BigCheckbox
                label="Utilities included"
                checked={property.utilities_inc}
                handle={this.props.setValue.bind(this, 'utilities_inc')}/>
            </div>
            <div>
              <BigCheckbox
                label="Furnished"
                checked={property.furnished}
                handle={this.props.setValue.bind(this, 'furnished')}/>
            </div>
            <div>
              <BigCheckbox
                label="Dishwasher included"
                checked={property.dishwasher}
                handle={this.props.setValue.bind(this, 'dishwasher')}/>
            </div>
            <div>
              <BigCheckbox
                label="Air conditioning"
                checked={property.airconditioning}
                handle={this.props.setValue.bind(this, 'airconditioning')}/>
            </div>
          </div>
          <div className="col-sm-6">
            <div>
              <BigCheckbox
                label="On Appalcart route"
                checked={property.appalcart}
                handle={this.props.setValue.bind(this, 'appalcart')}/>
            </div>
            <div>
              <BigCheckbox
                label="Club house available"
                checked={property.clubhouse}
                handle={this.props.setValue.bind(this, 'clubhouse')}/>
            </div>
            <div>
              <BigCheckbox
                label="Workout room"
                checked={property.workout_room}
                handle={this.props.setValue.bind(this, 'workout_room')}/>
            </div>
            <div>
              <BigCheckbox
                label="No smoking preference"
                checked={property.smoking_allowed}
                handle={this.props.setValue.bind(this, 'smoking_allowed')}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Features.propTypes = {
  property: PropTypes.object,
  setValue: PropTypes.func
}
