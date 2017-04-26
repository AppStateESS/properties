'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Row from '../Mixin/List/Row.jsx'

export default class SubleaseRow extends Row {
  constructor(props) {
    super(props)
  }

  getRent() {
    let rent = '$' + this.props.sublease.monthly_rent
    if (this.props.sublease.lease_type === '1') {
      return rent.concat(' share of rent')
    } else {
      return rent.concat(' for unit')
    }
  }

  render() {
    const {sublease} = this.props
    const link = `./properties/Sublease/${sublease.id}/${this.urlTitle(sublease.name)}`
    let image = (
      <div className="text-muted" style={{
        padding: '6px'
      }}>
        <i className="fa fa-camera fa-5x"></i>
        <br/>
        No photos available
      </div>
    )

    let titleClass
    if (sublease.active !== undefined && sublease.active === '0') {
      titleClass= 'title deactive'
    } else {
      titleClass='title active'
    }

    if (sublease.thumbnail !== '') {
      image = <img src={sublease.thumbnail} className="img-responsive"/>
    }
    return (
      <div className="row sublease-row">
        <div className="col-sm-3 col-md-3 text-center">
          <a href={link}>{image}</a>
        </div>
        <div className="col-sm-9 col-md-9">
          <h4 className={titleClass}>
            <a href={link}>{sublease.name}</a>
          </h4>
          <div className="row">
            <div className="col-sm-7 col-md-8">
              <div className="rent">{this.getRent()}</div>
              <div className="room-bath">{sublease.proptype}&nbsp; - {sublease.bedroom_no}&nbsp;Bed, {sublease.bathroom_no}&nbsp;Bath
              </div>
              <div className="availability">
                <strong>Availability:</strong>&nbsp;
                {sublease.move_in_date}</div>
              <div className="end-date">
                <strong>Sublease end date:</strong>&nbsp;
                {sublease.move_out_date}</div>
            </div>
            <div className="col-sm-5 col-md-4">
              {this.petsAllowed(sublease.pets_allowed)}
              {this.furnished(sublease.furnished)}
              {this.airconditioner(sublease.airconditioning)}
              {this.dishwasher(sublease.dishwasher)}
              {this.utilities(sublease.utilities_inc)}
              {this.appalcart(sublease.appalcart)}
              {this.washer(sublease.washer)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SubleaseRow.propTypes = {
  sublease: PropTypes.object
}
