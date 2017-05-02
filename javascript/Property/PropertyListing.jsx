'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PropertyRow from './PropertyRow.jsx'
import Waiting from '../Mixin/Html/Waiting.jsx'
import ReactTooltip from 'react-tooltip'

export default class PropertyListing extends Component {
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
        <div>{rows}
          <ReactTooltip type="light" border={true} effect="solid"/>
        </div>

      )
    }
  }
}

PropertyListing.propTypes = {
  list: PropTypes.array,
  search: PropTypes.bool
}
