'use strict'
import React from 'react'

/* global $ */

export default class PropertyRow extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip()
  }

  getRent() {
    let rent = '$' + this.props.property.monthly_rent
    if (this.props.property.lease_type === '1') {
      return rent.concat(' per tenant')
    } else {
      return rent.concat(' per unit')
    }
  }

  petsAllowed() {
    if (this.props.property.pets_allowed === '1') {
      return (
        <span
          className="fa-stack fa-lg text-success"
          data-toggle="tooltip"
          data-placement="top"
          title="Pet friendly">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-paw fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  furnished() {
    if (this.props.property.furnished === '1') {
      return (
        <span
          className="fa-stack fa-lg text-success"
          data-toggle="tooltip"
          data-placement="top"
          title="Furnished">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-bed fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  dishwasher() {
    if (this.props.property.dishwasher === '1') {
      return (
        <span
          className="fa-stack fa-lg text-success"
          data-toggle="tooltip"
          data-placement="top"
          title="Dishwasher">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-cutlery fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  utilities() {
    if (this.props.property.utilities_inc === '1') {
      return (
        <span
          className="fa-stack fa-lg text-success"
          data-toggle="tooltip"
          data-placement="top"
          title="Utilities included in rent">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-plug fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  airconditioner() {
    if (this.props.property.airconditioning === '1') {
      return (
        <span
          className="fa-stack fa-lg text-success"
          data-toggle="tooltip"
          data-placement="top"
          title="Air conditioning in unit">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-snowflake-o fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  workout() {
    if (this.props.property.workout_room === '1') {
      return (
        <span
          className="fa-stack fa-lg text-success"
          data-toggle="tooltip"
          data-placement="top"
          title="Workout room on premises">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-heartbeat fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  appalcart() {
    if (this.props.property.appalcart === '1') {
      return (
        <span
          className="fa-stack fa-lg text-success"
          data-toggle="tooltip"
          data-placement="top"
          title="On AppalCART route">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-bus fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  clubhouse() {
    if (this.props.property.clubhouse === '1') {
      return (
        <span
          className="fa-stack fa-lg text-success"
          data-toggle="tooltip"
          data-placement="top"
          title="Clubhouse on premises">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-coffee fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  washer() {
    if (this.props.property.washer === true) {
      return (
        <span
          className="fa-stack fa-lg text-success"
          data-toggle="tooltip"
          data-placement="top"
          title="Washer/Dryer in unit">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-archive fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  urlTitle(title) {
    return title.replace(/[^\w]/g, '-').substring(0, 20).toLowerCase()
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

    return (
      <div className="row property-row">
        <div className="col-sm-3 col-md-3 text-center">
          <a href={link}>{image}</a>
        </div>
        <div className="col-sm-9 col-md-9">
          <div className="title">
            <a href={link}>{property.name}</a>
          </div>
          <div className="row">
            <div className="col-sm-7 col-md-8">
              <div className="rent">{this.getRent()}</div>
              <div className="room-bath">{property.proptype}
                - {property.bedroom_no}&nbsp;Bed, {property.bathroom_no}&nbsp;Bath
              </div>
              <div className="availability">Availability: {property.move_in_date}</div>
            </div>
            <div className="col-sm-5 col-md-4">
              {this.petsAllowed()}
              {this.furnished()}
              {this.airconditioner()}
              {this.dishwasher()}
              {this.utilities()}
              {this.workout()}
              {this.clubhouse()}
              {this.appalcart()}
              {this.washer()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PropertyRow.propTypes
