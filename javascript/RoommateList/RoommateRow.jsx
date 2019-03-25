'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import empty from '../Mixin/Helper/Empty.js'

export default class RoommateRow extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  paragraphIfNotEmpty(value, label = null) {
    if (empty(value)) {
      return null
    } else {
      return <div>
        <strong>{label}</strong>{value}</div>
    }
  }

  render() {
    const {roommate} = this.props
    const para = this.paragraphIfNotEmpty
    let {description} = roommate
    if (description.length > 100) {
      description = description.substring(0, 100) + '...'
    }

    return (
      <div className="card card-default mb-3">
        <div className="card-header">
          <a href={`./properties/Roommate/${roommate.id}`}><h4 className="mb-0">
            <strong>Move in:</strong>&nbsp; {roommate.move_in_date}
          </h4></a>
          Updated: {roommate.updated}
        </div>
        <div className="card-body">
          <div className="card-text">
            {para(description, 'Description: ')}
            {para(roommate.study_time, 'Study time: ')}{para(roommate.focus, 'Focus: ')}
          </div>
          <div className="text-right">
            <a className="btn btn-info btn-sm" href={`./properties/Roommate/${roommate.id}`}>More details</a>
          </div>
        </div>
      </div>
    )
  }
}

RoommateRow.propTypes = {
  roommate: PropTypes.object
}
