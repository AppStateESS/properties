'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Waiting from '../Mixin/Html/Waiting.jsx'
import SubleaseRow from './SubleaseRow.jsx'

export default class Listing extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    const list = this.props.subleases
    if (list === null) {
      return <Waiting label="subleases"/>
    } else if (list.length === 0) {
      if (this.props.search === true) {
        return (
          <div className="lead">No subleases found. Try a different search?</div>
        )
      } else {
        return <div className="lead">No subleases found.</div>
      }
    } else {
      let rows
      rows = list.map(function (value, key) {
        return <SubleaseRow sublease={value} key={key}/>
      }.bind(this))
      return (
        <div className="listing">{rows}</div>
      )
    }

  }
}

Listing.propTypes = {
  subleases: PropTypes.array,
  search: PropTypes.bool
}
