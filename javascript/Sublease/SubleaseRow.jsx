'use strict'
import React from 'react'
import ViewRow from '../Mixin/List/Row.jsx'

export default class SubleaseRow extends Row {
  constructor(props) {
    super(props)
    this.state = {}
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
    return (
      <div className="row sublease-row">
        <div className="title">
          <a href={link}>{sublease.name}</a>
        </div>
        <div className="col-sm-4">
          <div className="rent">{this.getRent()}</div>
          <div className="room-bath">{sublease.proptype}&nbsp; - {sublease.bedroom_no}&nbsp;Bed, {sublease.bathroom_no}&nbsp;Bath
          </div>
        </div>
        <div className="col-sm-4">
          <div className="availability"><strong>Availability:</strong> {sublease.move_in_date}</div>
          <div className="end-date"><strong>Sublease end date:</strong> {sublease.move_out_date}</div>
        </div>
        <div className="col-sm-4">
          {this.petsAllowed(sublease.pets_allowed)}
          {this.furnished(sublease.furnished)}
          {this.airconditioner(sublease.airconditioning)}
          {this.dishwasher(sublease.dishwasher)}
          {this.utilities(sublease.utilities_inc)}
          {this.appalcart(sublease.appalcart)}
          {this.washer(sublease.washer)}
        </div>
      </div>
    )
  }
}

SubleaseRow.propTypes = {
  sublease: React.PropTypes.object
}
