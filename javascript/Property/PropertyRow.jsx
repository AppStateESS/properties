'use strict'
import React from 'react'
import pluralize from '../Mixin/Pluralize.js'

export default class PropertyRow extends React.Component {
  constructor(props) {
    super(props)
  }

  getRent() {
    let rent = '$' + this.props.property.monthly_rent
    if (this.props.property.lease_type === '1') {
      return rent.concat(' per renter')
    } else {
      return rent
    }
  }

  render() {
    const {property} = this.props
    const link = './properties/Property/' + property.id
    const company = property.company_name

    return (
      <div className="row panel panel-default">
        <div className="col-sm-2">picture</div>
        <div className="col-sm-10">
          <div className="panel-body property-row">
            <div className="title">{property.name}</div>
            <div className="row">
              <div className="col-sm-6">
                <div className="rent">{this.getRent()}</div>
                <div>{property.bedroom_no}&nbsp; {pluralize('bed', property.bedroom_no)}&nbsp;&#8226; &nbsp;{property.bathroom_no}&nbsp;{pluralize('bath', property.bathroom_no)}
                </div>
              </div>
              <div className="col-sm-6">
                {company}
              </div>
            </div>
            <div>
              <a className="btn btn-default" href={link}>Read more</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PropertyRow.propTypes
