'use strict'
import React from 'react'
import ButtonGroup from '../Mixin/ButtonGroup.jsx'
import Range from '../Mixin/Range.js'
import classnames from 'classnames'
import bindMethods from '../Mixin/Bind.js'

export default class Rooms extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      half: false
    }
    bindMethods([
      'updateBathroom', 'updateBedroom'
    ], this)

  }

  updateBedroom(bedrooms) {
    if (typeof bedrooms === 'object') {
      bedrooms = Number(bedrooms.target.value)
    } else {
      bedrooms = Number(bedrooms)
    }
    if (bedrooms >= 1 && bedrooms <= 6) {
      this.props.setValue('bedroom_no', bedrooms)
    }
  }

  updateBathroom(bathrooms) {
    if (typeof bathrooms === 'object') {
      bathrooms = Number(bathrooms.target.value)
    } else {
      bathrooms = Number(bathrooms)
    }
    if (bathrooms >= 1 && bathrooms <= 7) {
      this.props.setValue('bathroom_no', bathrooms)
    }
  }

  render() {
    const {property} = this.props
    let bathrooms = Range(property.bathroom_no, this.state.half)
    let bedrooms = Range(property.bedroom_no)
    const halfcn = classnames('marginLeft', 'btn', this.state.half
      ? 'btn-success'
      : 'btn-default')
    return (
      <div className="row">
        <div className="col-sm-6">
          <label>Bedrooms</label>
          <input
            type="text"
            size="1"
            onClick={this.select}
            onChange={this.updateBedroom}
            value={property.bedroom_no}
            className="single-input"/><br/>
          <ButtonGroup
            buttons={bedrooms}
            name="bedroom_no"
            match={property.bedroom_no}
            handle={this.updateBedroom}
            activeColor="success"/>
        </div>
        <div className="col-sm-6">
          <div>
            <label>Bathrooms</label>
            <input
              type="text"
              size="3"
              onChange={this.updateBathroom}
              onClick={this.select}
              value={property.bathroom_no}
              className="single-input"/>
          </div>
          <ButtonGroup
            buttons={bathrooms}
            name="bathroom_no"
            match={property.bathroom_no}
            handle={this.updateBathroom}
            activeColor="success"/>
          <button className={halfcn} onClick={this.half}>1/2</button>
        </div>
      </div>
    )
  }
}

Rooms.propTypes = {
  property: React.PropTypes.object,
  setValue: React.PropTypes.func
}
