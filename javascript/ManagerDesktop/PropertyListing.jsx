'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PropertyRow from '../Property/PropertyRow.jsx'
import Waiting from '../Mixin/Html/Waiting.jsx'

export default class PropertyListing extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const list = this.props.list
    if (list === null) {
      return <Waiting label="properties"/>
    } else if (list.length === 0) {
      return <div className="lead">No properties found.</div>
    } else {
      let rows
      rows = list.map(function (value, key) {
        return <PropertyRow
          property={value}
          key={key}
          showTimeout={true}
          reactivate={this.props.reactivate.bind(this, value.id)}/>
      }.bind(this))
      return (
        <div>{rows}</div>
      )
    }
  }
}

PropertyListing.propTypes = {
  list: PropTypes.array,
  search: PropTypes.bool,
  reactivate: PropTypes.func,
}
