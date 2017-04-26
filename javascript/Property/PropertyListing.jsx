'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PropertyRow from './PropertyRow.jsx'
import Waiting from '../Mixin/Html/Waiting.jsx'

/* global $ */

export default class PropertyListing extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    $('[data-toggle="tooltip"]').tooltip()
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
  list: PropTypes.array,
  search: PropTypes.bool
}
