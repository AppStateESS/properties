'use strict'
import React from 'react'
import PropertyRow from './PropertyRow.jsx'
import Waiting from '../Mixin/Html/Waiting.jsx'

export default class PropertyListing extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const list = this.props.list
    if (list === null) {
      return <Waiting label="properties"/>
    } else if (list.length === 0) {
      if (this.props.search === true) {
        return (
          <div className="lead">No properties found. Try a different search?</div>
        )
      } else {
        return <div className="lead">No properties found.</div>
      }
    } else {
      let rows
      rows = list.map(function (value, key) {
        return <PropertyRow property={value} key={key}/>
      }.bind(this))
      return (
        <div>{rows}</div>
      )
    }
  }
}

PropertyListing.propTypes = {
  list: React.PropTypes.array,
  search: React.PropTypes.bool
}
