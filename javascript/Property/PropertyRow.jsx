'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import Row from '../Mixin/List/Row.jsx'

export default class PropertyRow extends Row {
  constructor(props) {
    super(props)
  }

  getRent() {
    let rent = `\$ ${this.props.property.monthly_rent} ${this.props.property.lease_type}`
    return rent
  }

  workout() {
    if (this.props.property.workout_room === '1') {
      return (
        <span
          className="fa-stack fa-lg text-success"
          data-placement="top"
          data-tip="Workout room on premises">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-heartbeat fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  clubhouse() {
    if (this.props.property.clubhouse === '1') {
      return (
        <span>
          <span
            className="fa-stack fa-lg text-success"
            data-placement="top"
            data-tip="Clubhouse on premises">
            <i className="fa fa-square fa-stack-2x"></i>
            <i className="fa fa-coffee fa-stack-1x fa-inverse"></i>
          </span>
        </span>
      )
    }
  }

  pool() {
    if (this.props.property.pool === '1') {
      return (
        <span>
          <span
            className="fa-stack fa-lg text-success"
            data-placement="top"
            data-tip="Swimming pool on premises">
            <i className="fa fa-square fa-stack-2x"></i>
            <i className="fa fa-life-ring fa-stack-1x fa-inverse"></i>
          </span>
        </span>
      )
    }
  }

  render() {
    const {property} = this.props
    const link = `./properties/Property/${property.id}/${this.urlTitle(property.name)}`
    let image = (
      <div className="text-muted" style={{
        padding: '6px'
      }}>
        <i className="fa fa-camera fa-5x"></i>
        <br/>
        No photos available
      </div>
    )
    if (property.thumbnail !== '') {
      image = <img src={property.thumbnail} className="img-responsive"/>
    }

    let titleClass
    if (property.active !== undefined && property.active === '0') {
      titleClass = 'title deactive'
    } else {
      titleClass = 'title active'
    }

    return (
      <div className="row property-row">
        <div className="col-sm-3 col-md-3 text-center">
          <a href={link}>{image}</a>
        </div>
        <div className="col-sm-9 col-md-9">
          <h4 className={titleClass}>
            <a href={link}>{property.name}</a>
          </h4>
          <div className="row">
            <div className="col-sm-7 col-md-8">
              <div className="rent">{this.getRent()}</div>
              <div className="room-bath">{property.proptype}&nbsp; - {property.bedroom_no}&nbsp;Bed, {property.bathroom_no}&nbsp;Bath
              </div>
              <div className="availability">Availability: {property.move_in_date}</div>
            </div>
            <div className="col-sm-5 col-md-4">
              {this.smoking(property.smoke_free)}
              {this.closeToCampus(property.close_to_campus)}
              {this.petsAllowed(property.pets_allowed)}
              {this.furnished(property.furnished)}
              {this.airconditioner(property.airconditioning)}
              {this.dishwasher(property.dishwasher)}
              {this.utilities(property.utilities_inc)}
              {this.workout()}
              {this.clubhouse()}
              {this.pool()}
              {this.appalcart(property.appalcart)}
              {this.washer(property.washer)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PropertyRow.propTypes = {
  property: PropTypes.object
}
