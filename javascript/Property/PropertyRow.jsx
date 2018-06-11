'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import Row from '../Mixin/List/Row.jsx'
import moment from 'moment'

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
          className="fa-3x amenity-icon"
          data-placement="top"
          data-tip="Workout room on premises">
          <i
            className="fas fa-heartbeat"
            data-fa-transform="shrink-8"
            data-fa-mask="fas fa-square"></i>
        </span>
      )
    }
  }

  clubhouse() {
    if (this.props.property.clubhouse === '1') {
      return (
        <span
          className="fa-3x amenity-icon"
          data-placement="top"
          data-tip="Clubhouse on premises">
          <i
            className="fas fa-coffee"
            data-fa-transform="shrink-8"
            data-fa-mask="fas fa-square"></i>
        </span>
      )
    }
  }

  pool() {
    if (this.props.property.pool === '1') {
      return (
        <span
          className="fa-3x amenity-icon"
          data-placement="top"
          data-tip="Swimming pool on premises">
          <i
            className="fas fa-life-ring"
            data-fa-transform="shrink-8"
            data-fa-mask="fas fa-square"></i>
        </span>
      )
    }
  }

  render() {
    const {property} = this.props
    const link = `./properties/Property/${property.id}/${this.urlTitle(
      property.name
    )}`
    let image = (
      <div
        className="text-muted d-flex align-items-center flex-column justify-content-center h-100">
        <div>
          <i className="fa fa-camera fa-5x"></i>
        </div>
        <div>No photos available</div>
      </div>
    )
    if (property.thumbnail !== '') {
      const thumbStyle = {
        backgroundImage: `url('${property.thumbnail}')`
      }
      image = <div className="property-thumbnail" style={thumbStyle}></div>
    }

    let timeout
    let titleClass
    if (property.active !== undefined && property.active === '0') {
      titleClass = 'title deactive'
      if (this.props.showTimeout) {
        timeout = (
          <button className="btn btn-primary" onClick={this.props.reactivate}>Reactivate</button>
        )
      }
    } else {
      if (this.props.showTimeout) {
        const inactiveDate = moment(property.timeout * 1000).format('MMM D, YYYY')
        timeout = (
          <div className="mt-2">
            <p>
              <em>This property will be flagged inactive after {inactiveDate}. Update to reset timer.</em>
            </p>
          </div>
        )
      }
      titleClass = 'title active'
    }

    return (
      <div className="row property-row">
        <div className="col-sm-4 img-column">
          <a href={link}>{image}</a>
        </div>
        <div className="col-sm-8">
          <h4 className={titleClass}>
            <a href={link}>{property.name}</a>
          </h4>
          <div className="row">
            <div className="col-md-8">
              <div className="rent">{this.getRent()}</div>
              <div className="room-bath">{property.proptype}&nbsp; - {property.bedroom_no}&nbsp;Bed, {property.bathroom_no}&nbsp;Bath
              </div>
              <div className="availability">Availability: {property.move_in_date}</div>
            </div>
            <div className="col-md-4">
              <div className="icon-listing">
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
          {timeout}
        </div>
      </div>
    )
  }
}

PropertyRow.propTypes = {
  property: PropTypes.object.isRequired,
  showTimeout: PropTypes.bool,
  reactivate: PropTypes.func,
}
