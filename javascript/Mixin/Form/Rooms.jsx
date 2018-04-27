'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ButtonGroup from '../Form/ButtonGroup.jsx'
import Range from '../Helper/Range.js'
import classnames from 'classnames'
import bindMethods from '../Helper/Bind.js'

export default class Rooms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      half: false
    }
    bindMethods([
      'updateBathroom', 'updateBedroom', 'half'
    ], this)

  }

  half() {
    this.setState({
      half: !this.state.half
    })
    if (!this.state.half) {
      this.updateBathroom(`${this.props.property.bathroom_no}.5`)
    } else {
      this.updateBathroom(this.props.property.bathroom_no.substr(0,1))
    }
  }

  updateBedroom(bedrooms) {
    if (typeof bedrooms === 'object') {
      bedrooms = bedrooms.target.value
    }
    if (bedrooms >= '1' && bedrooms <= '6') {
      this.props.setValue('bedroom_no', bedrooms)
    }
  }

  updateBathroom(bathrooms) {
    if (typeof bathrooms === 'object') {
      bathrooms = bathrooms.target.value
    }
    if (bathrooms >= '1' && bathrooms <= '7') {
      this.props.setValue('bathroom_no', bathrooms)
    }
  }

  render() {
    const {property} = this.props
    let bathrooms = Range(property.bathroom_no, this.state.half)
    let bedrooms = Range(property.bedroom_no)
    const halfcn = classnames('ml-1', 'btn', this.state.half
      ? 'btn-success'
      : 'btn-outline-dark')
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
  property: PropTypes.object,
  setValue: PropTypes.func,
  bg : PropTypes.bool
}
