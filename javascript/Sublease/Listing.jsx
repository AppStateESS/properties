'use strict'
import React from 'react'
import Waiting from '../Mixin/Waiting.jsx'

export default class Listing extends React.Component {
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
      return (
        <div>Found subleases</div>
      )
    }

  }
}

Listing.propTypes = {
  subleases: React.PropTypes.array
}
