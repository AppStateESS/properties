'use strict'
import React from 'react'
import ViewRow from '../Mixin/ViewRow.jsx'

export default class SubleaseRow extends ViewRow {
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
    return(
      <div className="row property-row">
        <div className="title">
          <a href={link}>{sublease.name}</a>
        </div>
      </div>
    )
  }
}

SubleaseRow.propTypes = {
  sublease : React.PropTypes.object
}
